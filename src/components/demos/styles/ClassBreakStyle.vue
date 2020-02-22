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
      <button class="btn btn-outline-success" @click="addClassBreakStyle">Add a ClassBreakStyle Based on Population</button>
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from "../../../shared/DemoUtils";
import {
  FeatureLayer,
  ShapefileFeatureSource,
  ClassBreakStyle
} from "ginkgoch-map";
import { FeatureGridLayer, MapUtils } from "ginkgoch-leaflet-extensions";

export default {
  name: "class-break-style",
  desc: `Use class break style to render a thematic map.`,
  detail: `Class break style is used to render a thematic map based on features' break down values.`,

  async mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(
      this.map
    );

    let featureSource = new ShapefileFeatureSource(
      DemoUtils.resolveExtraResourcePath("cntry02.shp")
    );
    this.featureLayer = new FeatureLayer(featureSource);

    this.gridLayer = new FeatureGridLayer();
    this.gridLayer.pushLayer(this.featureLayer);
    this.gridLayer.addTo(this.map);

    await this.featureLayer.open();
    let envelope = await this.featureLayer.envelope();
    MapUtils.setEnvelope(this.map, envelope);
  },

  data() {
    return {
      legends: []
    };
  },

  methods: {
    async addClassBreakStyle() {
      const FIELD_NAME = "POP_CNTRY";

      if (this.classBreakStyle === undefined) {
        await this.featureLayer.open();
        let aggregator = await this.featureLayer.source.propertyAggregator([FIELD_NAME]);
        this.classBreakStyle = ClassBreakStyle.autoByAggregator('fill', FIELD_NAME, aggregator, 10, 'position', { fromColor: '#f7fbff', toColor: '#08306b', strokeColor: '#252525', strokeWidth: 1 });

        this.featureLayer.styles.length = 0;
        this.featureLayer.styles.push(this.classBreakStyle);
        this.gridLayer.redraw();
        this.legends = this.classBreakStyle.classBreaks.map((cb, i) => ({ value: cb.maximum, color: cb.style.fillStyle, fontColor: i > 4 ? 'white' : 'black' }));
      }
    }
  }
};
</script>
