<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button class="btn btn-outline-success" @click="addAMemoryFeatureLayer">Add a FeatureLayer with MemoryFeatureSource</button>
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import { FeatureGridLayer } from 'ginkgoch-leaflet-extensions';
import { MemoryFeatureSource, FeatureLayer, GeometryFactory, Feature, Projection, GeneralStyle } from 'ginkgoch-map';

export default {
  name: "memory-source",
  title: "In-Memory Source",
  source: '/sources/Memory',
  desc: `Use in-memory source to query and render on map.`,
  detail: `In-memory source is used to temporarily store features in memory, and expose a set of API to query and render on map.`,
  data() {
    return {};
  },
  mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(this.map);
  },
  methods: {
    addAMemoryFeatureLayer() {
      if (this.gridLayer !== undefined) {
        return;
      }

      let featureSource = new MemoryFeatureSource();
      featureSource.push(new Feature(GeometryFactory.buildCircle({x: -40, y: 40}, 30)));
      featureSource.push(new Feature(GeometryFactory.buildSquare({x: 40, y: 40}, 30)));
      featureSource.push(new Feature(GeometryFactory.buildStar({x: -40, y: -40}, 8, 30, 15)));
      featureSource.push(new Feature(GeometryFactory.buildEllipse({x: 40, y: -40}, 30, 20)));
      featureSource.projection = new Projection('WGS84', 'EPSG:3857');

      let featureLayer = new FeatureLayer(featureSource);
      featureLayer.styles.push(new GeneralStyle('#fff7bc', '#d95f0e', 4, 8))

      this.gridLayer = new FeatureGridLayer();
      this.gridLayer.pushLayer(featureLayer);
      this.gridLayer.addTo(this.map);
    }
  }
};
</script>
