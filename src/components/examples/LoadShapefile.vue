<template>
  <div class="container">
      <div id="mapContainer">Load Shapefile</div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
    name: 'load-shapefile',
    data() {
        return {}
    },
    mounted() {
        let map = L.map('mapContainer').setView([0, 0], 3);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Ginkgoch & OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}
</script>