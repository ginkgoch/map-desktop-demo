<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button class="btn btn-outline-success" @click="addFeatureLayer">Add a FeatureLayer with Multiple Source</button>
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { MultiSourceFeatureLayer, GeoJSONFeatureSource, Projection , ShapefileFeatureSource, FillStyle, PointStyle } from 'ginkgoch-map';
import { FeatureGridLayer, MapUtils } from 'ginkgoch-leaflet-extensions';

export default {
  name: "multi-source",
  title: "Multi Source",
  source: '/sources/MultiSource',
  desc: `Use Multi source to query and render on map.`,
  detail: `Multi source is used to fetch features from a specific delimited file on your local machine; it exposes a set of API to query and render on map.`,
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

      let shpFeatureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
      let jsonFeatureSource = new GeoJSONFeatureSource(DemoUtils.resolveExtraResourcePath('airports.json'));
      jsonFeatureSource.projection = new Projection('WGS84', 'EPSG:3857');

      let featureLayer = new MultiSourceFeatureLayer([shpFeatureSource, jsonFeatureSource]);
      featureLayer.styles.push(new FillStyle('rgba(254,232,200,0.4)', '#d95f0e', 1));
      featureLayer.styles.push(new PointStyle('#e34a33', 'black', 1, 2));

      this.gridLayer = new FeatureGridLayer();
      this.gridLayer.pushLayer(featureLayer);
      this.gridLayer.addTo(this.map);

      await featureLayer.open();
      let envelope = await featureLayer.envelope();

      MapUtils.setEnvelope(this.map, envelope);
    }
  }
};
</script>
