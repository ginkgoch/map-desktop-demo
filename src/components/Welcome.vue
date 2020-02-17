<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to build GIS desktop application with Ginkgoch,<br>
      check out the following demos with standalone features.
    </p>
    <h3>Geometries</h3>
    <ul>
      <li v-for="(demo, key) of demos" :key="key">
        <router-link :to="'/map-app/' + demo.path">{{ demo.title }}</router-link>
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://ginkgoch.com" target="_blank" rel="noopener">Website</a></li>
      <li><a href="https://ginkgoch.com/index.html#contact" target="_blank" rel="noopener">Contact</a></li>
      <li><a href="https://blog.ginkgoch.com" target="_blank" rel="noopener">Blog &amp; News</a></li>
      <li><a href="https://paypal.me/ginkgoch101" target="_blank" rel="noopener">Donate</a></li>
    </ul>
  </div>
</template>

<script>
import DemoList from '../shared/DemoList'

export default {
  name: 'Welcome',
  props: {
    msg: String
  },
  data() {
    return {
      demos: DemoList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hello img {
  margin-top: 60px;
}
</style>
