<template>
  <div>
    <div id="mapContainer"></div>
    <ul class="legend">
      <li
        v-for="item of legends"
        :key="item.value"
        class="text-muted text-sm"
        :style="'color: ' + item.fontColor + ' !important; background-color: ' + item.color"
      >{{ Math.trunc(item.value) }}</li>
    </ul>
    <section>
      <button class="btn btn-outline-success" @click="addValueStyle">Add a ValueStyle Based on COLOR_MAP</button>
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from "../../../shared/DemoUtils";
import { FeatureLayer, ShapefileFeatureSource, ValueStyle } from "ginkgoch-map";
import { FeatureGridLayer, MapUtils } from "ginkgoch-leaflet-extensions";

export default {
  name: "value-based-style",
  desc: `Use value based style to render a thematic map.`,
  detail: `Value style is used to render a thematic map based on one of feature's properties.`,

  data() {
    return { legends: [] };
  },

  async mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(
      this.map
    );

    let featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath("cntry02.shp"));
    this.featureLayer = new FeatureLayer(featureSource);

    this.gridLayer = new FeatureGridLayer();
    this.gridLayer.pushLayer(this.featureLayer);
    this.gridLayer.addTo(this.map);

    await this.featureLayer.open();
    let envelope = await this.featureLayer.envelope();
    MapUtils.setEnvelope(this.map, envelope);
  },
  methods: {
    async addValueStyle() {
      const FIELD_NAME = "COLOR_MAP";

      if (this.valueStyle === undefined) {
        await this.featureLayer.open();
        let aggregator = await this.featureLayer.source.propertyAggregator([FIELD_NAME]);
        let values = aggregator.distinct(FIELD_NAME);
        this.valueStyle = ValueStyle.auto("fill", FIELD_NAME, values, "#f7fbff", "#08306b", "#252525", 1);
        this.legends = this.valueStyle.items.map((v, i) => ({value:v.value, color: v.style.fillStyle, fontColor: i > 4 ? 'white' : 'black'}));

        this.featureLayer.styles.length = 0;
        this.featureLayer.styles.push(this.valueStyle);
        this.gridLayer.redraw();
      }
    }
  }
};
</script>