<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button class="btn btn-outline-success" @click="addFeatureLayer">Add a FeatureLayer with ShapefileFeatureSource</button>
    </section>
  </div>
</template>

<script>
import path from 'path';
import L from "leaflet";
import Constants from "../../../shared/Constants";
import { FeatureGridLayer } from 'ginkgoch-leaflet-extensions';
import { ShapefileFeatureSource, FeatureLayer, GeneralStyle } from 'ginkgoch-map';

export default {
  name: "shapefile-source",
  title: "Shapefile Source Basis",
  desc: `Use shapefile source to query and render on map.`,
  detail: `Shapefile source is used to fetch features from a specific shape file; it exposes a set of API to query and render on map.`,
  data() {
    return {};
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

      let featureSource = new ShapefileFeatureSource(path.join(process.resourcesPath, 'extraResources/cntry02.shp'));

      let featureLayer = new FeatureLayer(featureSource);
      featureLayer.styles.push(new GeneralStyle('#fff7bc', '#d95f0e', 4, 8))

      this.gridLayer = new FeatureGridLayer();
      this.gridLayer.pushLayer(featureLayer);
      this.gridLayer.addTo(this.map);
    }
  }
};
</script>
