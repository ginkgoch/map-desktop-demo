<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button class="btn btn-outline-success" @click="addFeatureLayer">Add a FeatureLayer with Delimited File</button>
      <button class="btn btn-outline-success" @click="renderProperties">Get Delimited File Properties</button>
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
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureGridLayer } from 'ginkgoch-leaflet-extensions';
import { FeatureLayer, GeneralStyle, CSVFeatureSource, Projection, ViewportUtils } from 'ginkgoch-map';

export default {
  name: "csv-source",
  title: "Delimited File Source",
  desc: `Use CSV source to query and render on map.`,
  detail: `CSV source is used to fetch features from a specific delimited file on your local machine; it exposes a set of API to query and render on map.`,
  data() {
    return {
      tableSource: [],
      comments: ''
    };
  },
  mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(this.map);
  },
  methods: {
    async addFeatureLayer() {
      if (this.gridLayer !== undefined) {
        return;
      }

      let options = { geomField: { x: 'longitude', y: 'latitude' }, hasFieldsRow: true };
      let featureSource = new CSVFeatureSource(DemoUtils.resolveExtraResourcePath('airports.csv'), options);
      featureSource.projection = new Projection('WGS84', 'EPSG:3857');

      let featureLayer = new FeatureLayer(featureSource);
      featureLayer.styles.push(new GeneralStyle('#fff7bc', '#d95f0e', 1, 6));

      this.gridLayer = new FeatureGridLayer();
      this.gridLayer.pushLayer(featureLayer);
      this.gridLayer.addTo(this.map);

      await featureLayer.open();
      let envelope = await featureLayer.envelope();

      let { x, y } = this.map.getSize();
      let viewportInfo = ViewportUtils.getInitViewport(envelope, x, y);
      this.map.setView([viewportInfo.lat, viewportInfo.lng], viewportInfo.zoom);
    },
    async renderProperties() {
      let options = { geomField: { x: 'longitude', y: 'latitude' }, hasFieldsRow: true };
      let featureSource = new CSVFeatureSource(DemoUtils.resolveExtraResourcePath('airports.csv'), options);
      await featureSource.open();

      let features = null;
      features = await featureSource.features();

      this.tableSource = featuresToTableSource(features);
    }
  }
};

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
