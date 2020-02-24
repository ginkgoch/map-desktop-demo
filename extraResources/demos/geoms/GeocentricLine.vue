<template>
  <div>
    <div id="mapContainer"></div>
    <div>
      <button
        type="button"
        class="btn btn-outline-success"
        @click="findGeocentricLine"
      >Find Geocentric Line</button>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import { Point, GeometryCollection, MultiPoint, ViewportUtils } from "ginkgoch-map";

let Beijing = new Point(116.6031, 40.0799);
let Manchester = new Point(2.2727, 53.3588);

export default {
  name: "geocentric-line",
  source: '/geoms/GeocentricLine',
  desc: "Find geocentric line between two points.",
  detail: "A Geocentric Line is any circle that circumnavigates the Earth and passes through the center of the Earth. Click the button below to get the geocentric line between Beijing and LA.",
  mounted() {
    let mapContainerDiv = document.querySelector('#mapContainer');
    let envelope = new MultiPoint([Beijing, Manchester]).envelope();
    let viewport = ViewportUtils.getInitViewport(envelope, mapContainerDiv.clientWidth, mapContainerDiv.clientHeight);
    let map = L.map("mapContainer").setView([viewport.lat, viewport.lng], viewport.zoom - 1);

    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(map);

    this.geomLayer = L.geoJSON(new GeometryCollection([Beijing, Manchester]).toJSON(), {
      style: Constants.DEFAULT_GEO_JSON_STYLE,
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, Constants.DEFAULT_GEO_JSON_STYLE);
      }
    });

    this.geomLayer.addTo(map);
  },
  methods: {
    findGeocentricLine() {
      let geocentricLine = Beijing.geocentricLine(Manchester);

      let geom = new GeometryCollection([Beijing, Manchester, geocentricLine]);
      this.geomLayer.clearLayers();
      this.geomLayer.addData(geom.toJSON());
    }
  }
};
</script>