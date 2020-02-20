<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <p>Check the options below to turn on/off the corresponding styles.</p>
      <div class="form-check form-check-inline" v-for="option of options" :key="option">
        <input class="form-check-input" type="checkbox" :id="option" :value="option" v-model="selectedOptions" @change="turnOnStyles">
        <label class="form-check-label" for="areaStyleVisible">{{ option }}</label>
      </div>
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureLayer, MultiSourceFeatureLayer, GeoJSONFeatureSource, Projection , ShapefileFeatureSource, FillStyle, LineStyle, PointStyle } from 'ginkgoch-map';
import { FeatureGridLayer, MapUtils } from 'ginkgoch-leaflet-extensions';
import { TextStyle } from 'ginkgoch-map';

export default {
  name: "simple-styles",
  desc: `Use simple styles to render vectors.`,
  detail: `Simple styles include styles to render points, lines, areas and labels. The corresponding styles will be invalid when it doesn't match the vector types.`,
  data() {
    return {
      options: ['Fill Style', 'Line Style', 'Point Style', 'Text Style'],
      selectedOptions: []
    };
  },
  async mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(this.map);

    let shpFeatureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
    let lineFeatureSource = new GeoJSONFeatureSource(DemoUtils.resolveExtraResourcePath('beijing-machester.json'));
    let pointFeatureSource = new GeoJSONFeatureSource(DemoUtils.resolveExtraResourcePath('airports.json'));

    lineFeatureSource.projection = new Projection('WGS84', 'EPSG:3857');
    pointFeatureSource.projection = new Projection('WGS84', 'EPSG:3857');

    this.featureLayer = new MultiSourceFeatureLayer([shpFeatureSource, lineFeatureSource, pointFeatureSource]);
    this.labelLayer = new FeatureLayer(shpFeatureSource);
    this.labelLayer.margin = 100;

    this.gridLayer = new FeatureGridLayer();
    this.gridLayer.pushLayer(this.featureLayer);
    this.gridLayer.pushLayer(this.labelLayer);
    this.gridLayer.addTo(this.map);

    await this.featureLayer.open();
    let envelope = await this.featureLayer.envelope();
    MapUtils.setEnvelope(this.map, envelope);
  },
  methods: {
    turnOnStyles() {
      this.featureLayer.styles.length = 0;
      this.labelLayer.styles.length = 0;

      let styles = this.selectedOptions.map(s => {
        let style = undefined;
        switch(s) {
          case 'Fill Style': 
            style = new FillStyle('rgba(254,232,200,0.4)', '#d95f0e', 1);
            break;
          case 'Line Style': 
            style = new LineStyle('#e34a33', 4); 
            break;
          case 'Point Style': 
            style = new PointStyle('#fee8c8', '#e34a33', 1, 4);
            break;
        }

        return style;
      }).filter(s => s !== undefined);

      if (styles !== undefined && styles.length > 0) {
        this.featureLayer.styles.push(...styles);
      }

      if (this.selectedOptions.includes('Text Style')) {
        this.labelLayer.styles.push(new TextStyle('[CNTRY_NAME]', '#e34a33'));
      }

      this.gridLayer.redraw();
    }
  }
};
</script>
