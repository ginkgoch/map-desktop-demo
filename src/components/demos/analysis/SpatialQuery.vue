<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <dropdown title="Select a Spatial Relationship" :items="relationships" @changed="onChanged" />
      <small class="text-muted text-sm">{{ summary }}</small>
    </section>
    <section class="table-container">
      <table class="table table-sm" v-if="tableSource.length > 0">
        <thead>
          <tr>
            <th v-for="(cell, k) of tableSource[0]" :key="k">{{ cell }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rkey) of tableSource.slice(1)" :key="rkey">
            <td v-for="(cell, ckey) of row" :key="ckey" class="small">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import fs from 'fs';
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureGridLayer, MapUtils } from 'ginkgoch-leaflet-extensions';
import { FeatureLayer, GeneralStyle, ShapefileFeatureSource, Feature, MemoryFeatureSource } from 'ginkgoch-map';
import Dropdown from '@/components/controls/Dropdown';

export default {
  name: "spatial-query",
  desc: `Query features from a specific source based on a relationship to a feature.`,
  detail: `Built-in relationship includes disjoint, intersection, overlap, touch and within.`,
  data() {
    return {
      relationships: ['None', 'Intersection', 'Disjoint', 'Overlap', 'Touch', 'Within'],
      tableSource: [],
      summary: ''
    };
  },
  components: {
    'dropdown': Dropdown
  },
  async mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(this.map);

    this.featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
    let featureLayer = new FeatureLayer(this.featureSource);
    featureLayer.styles.push(new GeneralStyle('rgba(222,235,247,0.5)', 'black', 1, 6));

    this.queryTarget = getQueryTargetFeature();
    let queryTargetSource = new MemoryFeatureSource([this.queryTarget]);
    let queryTargetLayer = new FeatureLayer(queryTargetSource);
    queryTargetLayer.styles.push(new GeneralStyle('rgba(254,230,206,0.5)', '#d95f0e', 2, 6));

    this.highlightSource = new MemoryFeatureSource();
    let highlightLayer = new FeatureLayer(this.highlightSource);
    highlightLayer.styles.push(new GeneralStyle('rgba(230,85,13,0.6)', '#e6550d', 1, 6));

    this.gridLayer = new FeatureGridLayer(undefined, { noWrap: true });
    this.gridLayer.pushLayer(featureLayer);
    this.gridLayer.pushLayer(queryTargetLayer);
    this.gridLayer.pushLayer(highlightLayer);
    this.gridLayer.addTo(this.map);

    await featureLayer.open();
    let envelope = await featureLayer.envelope();
    MapUtils.setEnvelope(this.map, envelope);
  },
  methods: {
    async onChanged(label) {
      this.highlightSource.internalFeatures.length = 0;

      let highlightFeatures = await this.featureSource.query(label.toLowerCase(), this.queryTarget.geometry, 'EPSG:3857')
      this.highlightSource.internalFeatures.push(...highlightFeatures);
      this.gridLayer.redraw();

      this.tableSource = featuresToTableSource(highlightFeatures);
      
      let highlightsLength = this.highlightSource.internalFeatures.length;
      this.summary = highlightsLength > 0 ? `There are ${highlightsLength} features found.` : '';
    }
  }
};

function getQueryTargetFeature() {
  let jsonContent = fs.readFileSync(DemoUtils.resolveExtraResourcePath('query-target.json')).toString();
  let queryTarget = Feature.create(JSON.parse(jsonContent));
  return queryTarget;
}

function featuresToTableSource(features) {
  let tableSource = [];
  if (features.length > 0) {
    tableSource.push(features[0].properties.keys());
  }

  features.forEach(f => tableSource.push(f.properties.values()));

  return tableSource;
}
</script>

<style>
.table-container {
  max-height: 400px;
  overflow-y: auto;
}
</style>
