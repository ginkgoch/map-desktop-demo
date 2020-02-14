<template>
  <div class="container">
      <div id="mapContainer"></div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
    name: 'hello-map',
    path: '',
    title: 'Hello Map',
    route: 'HelloMap',
    desc: `Build a simple desktop map application with few lines of code.`,
    data() {
        return {}
    },
    mounted() {
        let map = L.map('mapContainer').setView([0, 0], 3);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}
</script>

