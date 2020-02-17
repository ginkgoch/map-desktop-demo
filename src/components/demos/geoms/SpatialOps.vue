<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <div class="dropdown">
        <button
          class="btn btn-outline-success dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdownMenu2" 
        >Select a Geospatial Operation</button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" v-for="op of spatialOps" :key="op.name">{{ op.name }}</a>
        </div>
      </div>

      <button class="btn btn-success">Execute</button>
    </section>
  </div>
</template>

<script>
import "bootstrap"
import L from "leaflet"
import Constants from "../../../shared/Constants"

export default {
  name: "geospatial-ops",
  desc: "Apply Geospatial Operations on one or more geometries.",
  detail: `Buffer, difference, convexhull, intersection, union and normalize are all build-in geospatial operations. Select one of the operations in the dropdown and click <b>Execute</b> button.`,
  data() {
    let spatialOps = [
      { name: "Buffer" },
      { name: "Difference" },
      { name: "Convexhull" },
      { name: "Intersection" },
      { name: "Union" },
      { name: "Normalize" }
    ];

    return { spatialOps };
  },
  mounted() {
    let map = L.map("mapContainer").setView([0, 0], 3);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_GEO_JSON_OPTIONS).addTo(map);
  }
};
</script>

<style>
</style>