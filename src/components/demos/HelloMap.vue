<template>
  <div id="mapContainer"></div>
</template>

<script>
import L from "leaflet";
import Constants from "../../shared/Constants";

export default {
  name: "hello-map",
  path: "",
  title: "Hello Map",
  route: "HelloMap",
  desc: `Build a simple desktop map application with few lines of code.`,
  detail: `This is a pure map with Leaflet integrated. We will show you all the <b>Ginkgoch MAP SDK</b> features based on this demo.`,
  data() {
    return {};
  },
  mounted() {
    let map = L.map("mapContainer").setView([0, 0], 3);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(map);
  }
};
</script>

