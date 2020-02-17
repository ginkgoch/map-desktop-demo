<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <div class="dropdown">
        <button
          class="btn btn-outline-success dropdown-toggle"
          type="button"
          style="width: 260px;"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >{{ selectedSpatialOps }}</button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            v-for="op of spatialOps"
            :key="op"
            @click="prepare(op)"
          >{{ op }}</a>
        </div>
      </div>

      <button class="btn btn-success" @click="execute" :disabled="!prepared">Execute</button>
    </section>
  </div>
</template>

<script>
import "bootstrap";
import L from "leaflet";
import Constants from "../../../shared/Constants";
import { GeometryFactory, SpatialOps } from "ginkgoch-map";

let geomLayer = null;
let geomSource = [];
let geomTarget = [];

export default {
  name: "geospatial-ops",
  desc: "Apply Geospatial Operations on one or more geometries.",
  detail: `Buffer, difference, convexhull, intersection, union and normalize are all build-in geospatial operations. Select one of the operations in the dropdown and click <b>Execute</b> button.`,
  data() {
    let spatialOps = [
      "Buffer",
      "Difference",
      "ConvexHull",
      "Intersection",
      "Union"
    ];

    let selectedSpatialOps = "Select a Geospatial Operation";
    return { spatialOps, selectedSpatialOps, prepared: false };
  },
  mounted() {
    let map = L.map("mapContainer").setView([0, 0], 3);
    L.tileLayer(
      Constants.OSM_SERVICE_URL,
      Constants.DEFAULT_OSM_OPTIONS
    ).addTo(map);

    geomLayer = L.geoJSON([], Constants.DEFAULT_GEO_JSON_STYLE);
    geomLayer.addTo(map);
  },
  methods: {
    prepare(name) {
      if (this.selectedSpatialOps === name) {
        return;
      }

      this.prepared = true;
      this.selectedSpatialOps = name;

      switch (name) {
        case "Buffer":
          geomSource = [GeometryFactory.buildStar({ x: 0, y: 0 }, 5, 20)];
          break;
        case "Difference":
          geomSource = [
            GeometryFactory.buildCircle({ x: -10, y: 0 }, 20),
            GeometryFactory.buildStar({ x: 0, y: 0 }, 5, 20)
          ];
          break;
        case "ConvexHull":
          geomSource = [GeometryFactory.buildStar({ x: 0, y: 0 }, 5, 20)];
          break;
        case "Intersection":
          geomSource = [
            GeometryFactory.buildCircle({ x: -10, y: 0 }, 20),
            GeometryFactory.buildStar({ x: 0, y: 0 }, 5, 20)
          ];
          break;
        case "Union":
          geomSource = [
            GeometryFactory.buildCircle({ x: -10, y: 0 }, 20),
            GeometryFactory.buildStar({ x: 0, y: 0 }, 5, 20)
          ];
          break;
      }

      geomLayer.clearLayers();
      geomLayer.addData(geomSource.map(g => g.toJSON()));
    },

    execute() {
      switch (this.selectedSpatialOps) {
        case "Buffer":
          geomTarget = SpatialOps.buffer(geomSource[0], 10);
          break;
        case "Difference":
          geomTarget = SpatialOps.diff(geomSource[0], geomSource[1]);
          break;
        case "ConvexHull":
          geomTarget = SpatialOps.convexHull(geomSource[0]);
          break;
        case "Intersection":
          geomTarget = SpatialOps.intersection(geomSource[0], geomSource[1]);
          break;
        case "Union":
          geomTarget = SpatialOps.union(geomSource[0], geomSource[1]);
          break;
      }

      geomLayer.clearLayers();
      geomLayer.addData(geomTarget.toJSON());
    }
  }
};
</script>

<style>
</style>