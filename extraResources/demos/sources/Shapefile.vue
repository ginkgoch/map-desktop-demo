<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button class="btn btn-outline-success" @click="addFeatureLayer">Add a FeatureLayer with Shapefile</button>
      <button class="btn btn-outline-success" @click="renderHeader">Get Shapefile Header</button>
      <button class="btn btn-outline-success" @click="renderFields">Get Shapefile Fields</button>
      <button class="btn btn-outline-success" @click="renderProperties(5)">Get Shapefile Properties Top 5</button>
      <button class="btn btn-outline-success" @click="renderProperties(undefined)">Get Shapefile Properties (Slower than Top 5)</button>
    </section>
    <section class="table-container">
      <Table :source="tableSource" />
    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureGridLayer } from 'ginkgoch-leaflet-extensions';
import { ShapefileFeatureSource, FeatureLayer, GeneralStyle, ShapefileType } from 'ginkgoch-map';
import Table from '@/components/controls/Table';

export default {
  name: "shapefile-source",
  title: "Shapefile Source",
  source: '/sources/Shapefile',
  desc: `Use shapefile source to query and render on map.`,
  detail: `Shapefile source is used to fetch features from a specific shape file on your local machine; it exposes a set of API to query and render on map.`,
  components: { 'Table': Table },
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
    addFeatureLayer() {
      if (this.gridLayer !== undefined) {
        return;
      }

      let featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));

      let featureLayer = new FeatureLayer(featureSource);
      featureLayer.styles.push(new GeneralStyle('#fff7bc', '#d95f0e', 1))

      this.gridLayer = new FeatureGridLayer();
      this.gridLayer.pushLayer(featureLayer);
      this.gridLayer.addTo(this.map);
    },
    async renderHeader() {
      let featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
      await featureSource.open();

      let shapefile = featureSource._shapefile;
      let header = _.cloneDeep(shapefile.header());
      header.fileType = _.chain(ShapefileType).findKey(k => k === header.fileType).capitalize().value();
      let tableSource = [['Name', 'Value'], ..._.toPairs(header)];
      this.tableSource = tableSource;
      this.comments = 'This is shapefile header information.';
    },
    async renderFields() {
      let featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
      await featureSource.open();

      let shapefile = featureSource._shapefile;
      let fields = _.cloneDeep(shapefile.fields(true));
      let tableSource = [['Name', 'Type', 'Length', 'Decimal'], ..._.values(fields)];
      this.tableSource = tableSource;
      this.comments = 'This is shapefile fields information.';
    },
    async renderProperties(limitCount = undefined) {
      let featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
      await featureSource.open();

      let features = null;
      if (limitCount === undefined || limitCount <= 0) {
        // Get all features or query features intersecting envelope is simple.
        features = await featureSource.features();
      }
      else {
        // To limit the return record count needs a trick.
        let shapefile = featureSource._shapefile;
        let records = shapefile.iterator();

        features = [];
        let record = null;
        let count = 0;
        while ((record = records.next()) && !records.done) {
          if (!record.hasValue) {
            continue;
          }

          features.push(record.value);
          count ++;
          if (count >= limitCount) {
            break;
          }
        }
      }

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
