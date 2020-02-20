<template>
  <div>
    <div class="container-fluid nav-logo">
      <h2 class="container">
        <router-link to="/">
          <img src="../assets/logo.png" />
        </router-link>
        <span>Ginkgoch MAP DEMOs</span>
      </h2>
    </div>

    <div class="container content-container">
      <div class="row">
        <div class="col-md-4 side-panel">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(item, key) in sampleList" :key="key">
              <a href="javascript:void(0)" @click="routerLinkClick(item.path, $event)">{{ item.title }}</a>
              <p>
                <small class="text-muted">{{ item.desc }}</small>
              </p>
            </li>
          </ul>
        </div>
        <div class="col-md-8 demo-container">
          <h3>{{ title }}</h3>
          <p class="text-muted">{{ desc }} <span v-html="detail" /></p>
          <div class="container">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import sampleList from '../shared/DemoList';

function getDemoInfo(path) {
    path = path.replace('/map-app', '');
    path = path.replace(/^\//i, '');
    let demo = sampleList.find(s => s.path === path);
    return { title: demo.title, desc: demo.desc, detail: demo.detail };
}

export default {
  name: "map-app",
  data() {
    return {
      title: '',
      desc: '',
      detail: '',
      sampleList
    };
  },
  mounted() {
    let path = this.$router.currentRoute.path;
    this.setDemoInfo(path);
  },
  methods: {
    routerLinkClick(name) {
      let path = '/map-app/' + name;
      path = path.replace(/\/$/i, '');
      if (path !== this.$router.currentRoute.path) {
        this.$router.replace(path);
        this.setDemoInfo(path);
      }
    },
    setDemoInfo(path) {
      let demo = getDemoInfo(path);
      this.title = demo.title;
      this.desc = demo.desc;
      this.detail = demo.detail;
    }
  }
};
</script>

<style>
#mapContainer {
  height: 400px;
  background-color: #f0f0f0;
  border: solid 1px #c0c0c0;
}

ul p {
  margin-bottom: 0px;
}

.container {
  text-align: left;
}

.nav-logo {
  background-color: white;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,.05), inset 0 -1px 0 rgba(0,0,0,.1)
}

.nav-logo img {
  width: 44px;
  margin: 14px;
}

.nav-logo span {
  line-height: 72px;
}

.side-panel a:link {
  color: #2e983e;
}

.side-panel a:active {
  color: #42b983;
}

.content-container {
    margin-top: 2rem;
    height: calc(100% - 140px);
}

.content-container>.row {
  height: 100%;
}

.content-container>.row>.side-panel {
  height: 100%;
}

.content-container>.row>.side-panel>ul {
  overflow-y: auto;
  height: 100%;;
}

.demo-container>div.container>div {
  position: relative;
}

.demo-container h3, .demo-container p {
  margin: 0.5rem 0 0.5rem 1rem;
}

.btn {
  margin: 8px 4px;
}

.dropdown {
  display: inline-block;
}

.legend {
  width: 80px;
  position: absolute;
  margin-left: 10px;
  z-index: 1000;
  list-style: none;
  padding: 0px;
  background: white;
  bottom: 44px;
}

.legend li {
  font-size: 10px;
  line-height: 16px;
  padding-left: 4px;
}
</style>