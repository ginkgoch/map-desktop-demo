<template>
  <div class="container">
      <router-link to="/">Back to Welcome</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
    name: 'map-app'
}
</script>

<style>
#mapContainer {
    height: 400px;
    background-color: #f0f0f0;
}
</style>