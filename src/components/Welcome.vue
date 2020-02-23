<template>
  <div class="container hello text-center">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to build GIS desktop application with Ginkgoch,<br>
      check out the following demos with standalone features.
    </p>
    <h3 class="demo-list">HOW DO I FEATURE DEMOs</h3>
    <section class="demo-categories row">
      <div class="col-md-4" v-for="(col, i) of demoColumnConfig" :key="i">
        <div v-for="category of col.map(c => categories.find(g => g.name === c))" :key="category.name">
          <h5 class="demo-category-title">{{ category.name }}</h5>
          <ul>
            <li class="demo-item" v-for="(demo, key) of category.demos" :key="key">
              <router-link :to="'/map-app/' + demo.path">{{ demo.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="ginkgoch-links">
      <h3>Ginkgoch Links</h3>
      <ul>
        <li><a href="https://ginkgoch.com" target="_blank" rel="noopener">Website</a></li>
        <li><a href="https://ginkgoch.com/index.html#contact" target="_blank" rel="noopener">Contact</a></li>
        <li><a href="https://blog.ginkgoch.com" target="_blank" rel="noopener">Blog &amp; News</a></li>
        <li><a href="https://paypal.me/ginkgoch101" target="_blank" rel="noopener">Donate</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
import DemoList, { demoCategories, demoColumnConfig } from '../shared/DemoList';

export default {
  name: 'Welcome',
  props: {
    msg: String
  },
  data() {
    return {
      demos: DemoList,
      categories: demoCategories,
      demoColumnConfig
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 30px 0;
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

.demo-category-title {
  text-align: left;
  padding-left: 10px;
}

ul li.demo-item {
  display: block;
  text-align: left;
  margin: 4px 14px;
}
</style>
