<template>
  <div class="container">
    <div id="mapContainer"></div>
    <div class="row">
      <button
        type="button"
        class="btn btn-outline-success"
        v-for="geomType in geomTypes"
        :key="geomType"
        @click="plotGeometry"
      >Plot {{ geomType }}</button>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import { GeometryFactory } from "ginkgoch-map";

let geomLayer = null;

export default {
  name: "special-polygons",
  desc: "Plot build-in special polygons on map.",
  detail:
    "Star, Square, Rectangle, Circle, Ellipse are all build-in special polygons. We are going to add those geometries by clicking the buttons below.",
  data() {
    let geomTypes = [
      "Star",
      "Square",
      "Rectangle",
      "Circle",
      "Ellipse"
    ];
    return { geomTypes };
  },
  mounted() {
    let map = L.map("mapContainer").setView([0, 0], 3);
    L.tileLayer(Constants.OSM_SERVICE_URL, {
      attribution: Constants.OSM_ATTRIBUTION
    }).addTo(map);

    geomLayer = L.geoJSON([], {
      style: Constants.DEFAULT_GEO_JSON_STYLE,
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, Constants.DEFAULT_GEO_JSON_STYLE);
      }
    });

    geomLayer.addTo(map);
  },
  methods: {
    plotGeometry(e) {
      geomLayer.clearLayers();

      let geom = undefined;
      let eventName = e.target.innerText.replace(/Plot\s/i, "");
      let center = { x: 0, y: 0 };
      switch (eventName) {
        case "Star":
          geom = GeometryFactory.buildStar(center, 5, 20, 10);
          break;
        case "Square":
          geom = GeometryFactory.buildSquare(center, 20);
          break;
        case "Rectangle":
          geom = GeometryFactory.buildRectangle(center, 20, 15);
          break;
        case "Circle":
          geom = GeometryFactory.buildCircle(center, 15);
          break;
        case "Ellipse":
          geom = GeometryFactory.buildEllipse(center, 20, 12);
          break;
      }

      if (geom !== undefined) {
        geomLayer.addData(geom.toJSON());
      }
    }
  }
};
</script>

<style>
</style>