<template>
  <div>
    <div id="mapContainer"></div>
    <div>
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
import _ from 'lodash';
import Constants from "../../../shared/Constants";
import { Point, LineString, Polygon, LinearRing, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection } from "ginkgoch-map";

let geomLayer = null;

export default {
  name: "normal-geometry",
  desc: "Plot normal geometries on map.",
  source: '/geoms/Geometries',
  detail:
    "Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon as well as GeometryCollection are all supported normal geometries. We are going to add those geometries by clicking the buttons below.",
  data() {
    let geomTypes = [
      "Point",
      "LineString",
      "Polygon",
      "MultiPoint",
      "MultiLineString",
      "MultiPolygon",
      "GeometryCollection"
    ];
    return { geomTypes };
  },
  mounted() {
    let map = L.map("mapContainer").setView([0, 0], 3);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(map);

    geomLayer = L.geoJSON([], Constants.DEFAULT_GEO_JSON_OPTIONS);
    geomLayer.addTo(map);
  },
  methods: {
    plotGeometry(e) {
      geomLayer.clearLayers();

      let geom = undefined;
      let eventName = e.target.innerText.replace(/Plot\s/i, "");
      switch (eventName) {
        case "Point":
          geom = new Point(0, 0);
          break;
        case "LineString":
          geom = new LineString([ { x: -30, y: 15 }, { x: -15, y: -15 }, { x: 0, y: 10 }, { x: 15, y: -15 }, { x: 30, y: 15 }]);
          break;
        case "Polygon":
          geom = new Polygon(new LinearRing([ { x: 0, y: 15 }, { x: 15, y: 0 }, { x: 0, y: -15 }, { x: -15, y: 0 }, { x: 0, y: 15 }]));
          break;
        case "MultiPoint":
          geom = new MultiPoint(_.chunk([0, 15, 15, 0, 0, -15, -15, 0], 2).map(p => new Point(p[0], p[1])));
          break;
        case "MultiLineString":
          geom = new MultiLineString(_.range(4).map(i => new LineString(_.chunk([-30, 15, -15, -5, 0, 10, 15, -5, 30, 15], 2).map(p => ({ x: p[0], y: p[1] - i * 5 })))));
          break;
        case "MultiPolygon":
          geom = new MultiPolygon([
            new Polygon(new LinearRing(_.chunk([-20, 15, -5, 0, -20, -15, -35, 0, -20, 15], 2).map(p => ({x: p[0], y: p[1]})))),
            new Polygon(new LinearRing(_.chunk([20, 15, 35, 0, 20, -15, 5, 0, 20, 15], 2).map(p => ({x: p[0], y: p[1]}))))
          ]);
          break;
        case "GeometryCollection":
          geom = new GeometryCollection([
            new Point(0, 0),
            new LineString([ { x: -30, y: 5 }, { x: -25, y: -5 }, { x: -20, y: 5 }, { x: -15, y: -5 }, { x: -10, y: 5 }]),
            new Polygon(new LinearRing(_.chunk([20, 15, 35, 0, 20, -15, 5, 0, 20, 15], 2).map(p => ({x: p[0], y: p[1]}))))
          ]);
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