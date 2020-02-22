<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button class="btn btn-outline-success" @click="addFeatureLayer">Add a FeatureLayer with Delimited File</button>
      <button class="btn btn-outline-success" @click="renderProperties">Get Delimited File Properties</button>
    </section>
    <section>
      <feature-table :features="tableSource" />
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureGridLayer, MapUtils } from 'ginkgoch-leaflet-extensions';
import { FeatureLayer, GeneralStyle, CSVFeatureSource, Projection } from 'ginkgoch-map';
import FeatureTable from '@/components/controls/FeatureTable';

export default {
  name: "csv-source",
  title: "Delimited File Source",
  desc: `Use CSV source to query and render on map.`,
  detail: `CSV source is used to fetch features from a specific delimited file on your local machine; it exposes a set of API to query and render on map.`,
  components: {
    'feature-table': FeatureTable
  },
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
      MapUtils.setEnvelope(this.map, envelope);
    },
    async renderProperties() {
      let options = { geomField: { x: 'longitude', y: 'latitude' }, hasFieldsRow: true };
      let featureSource = new CSVFeatureSource(DemoUtils.resolveExtraResourcePath('airports.csv'), options);
      await featureSource.open();

      let features = null;
      features = await featureSource.features();

      this.tableSource = features;
    }
  }
};
</script>
