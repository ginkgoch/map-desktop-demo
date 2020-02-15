<template>
  <div class="container">
      <div id="mapContainer"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import Constants from '../../shared/Constants'

export default {
    name: 'load-shapefile',
    path: 'load-shapefile',
    title: 'Load a Shapefile',
    route: 'LoadShapefile',
    desc: `Load a shapefile from your local machine and render on map.`,
    data() {
        return {}
    },
    mounted() {
        let map = L.map('mapContainer').setView([0, 0], 3);
        L.tileLayer(Constants.OSM_SERVICE_URL, { attribution: Constants.OSM_ATTRIBUTION }).addTo(map)
    }
}
</script>