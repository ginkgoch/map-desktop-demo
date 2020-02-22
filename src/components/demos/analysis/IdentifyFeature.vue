<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <small class="text-muted text-sm">{{ summary }}</small>
      <feature-table :features="tableSource" /> 
    </section>
  </div>
</template>

<script>
import L from "leaflet";
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureGridLayer, MapUtils } from 'ginkgoch-leaflet-extensions';
import { FeatureLayer, GeneralStyle, ShapefileFeatureSource, MemoryFeatureSource, Projection, Envelope, GeometryFactory, Point } from 'ginkgoch-map';
import FeatureTable from '@/components/controls/FeatureTable';

export default {
  name: "identify-feature",
  desc: `Identify a feature by clicking on the map`,
  detail: `Click on the map will trigger an event to query the clicked area, and find all the features near the clicked area.`,
  data() {
    return {
      relationships: ['None', 'Intersection', 'Disjoint', 'Overlap', 'Touch', 'Within'],
      tableSource: [],
      summary: ''
    };
  },
  components: {
    'feature-table': FeatureTable
  },
  async mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(this.map);

    this.featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
    let featureLayer = new FeatureLayer(this.featureSource);
    featureLayer.styles.push(new GeneralStyle('rgba(222,235,247,0.5)', 'black', 1, 6));

    this.highlightSource = new MemoryFeatureSource();
    let highlightLayer = new FeatureLayer(this.highlightSource);
    highlightLayer.styles.push(new GeneralStyle('rgba(230,85,13,0.6)', '#e6550d', 1, 6));

    this.gridLayer = new FeatureGridLayer(undefined, { noWrap: true });
    this.gridLayer.pushLayer(featureLayer);
    this.gridLayer.pushLayer(highlightLayer);
    this.gridLayer.addTo(this.map);

    await featureLayer.open();
    let envelope = await featureLayer.envelope();
    MapUtils.setEnvelope(this.map, envelope);

    let projection = new Projection('WGS84', 'EPSG:3857');
    this.map.on('click', async evt => {
      let { lat, lng } = evt.latlng;
      let { x, y } = projection.forward(new Point(lng, lat));
      let queryGeom = GeometryFactory.envelopeAsPolygon(new Envelope(x - 1e-6, y - 1e-6, x + 1e-6, y + 1e-6));
      let features = await this.featureSource.query('intersection', queryGeom);

      this.tableSource = features;
      this.summary = `There are ${features.length} feature(s) being found.`;
      this.highlightSource.internalFeatures.length = 0;
      this.highlightSource.internalFeatures.push(...features);
      this.gridLayer.redraw();
    });
  }
};
</script>

<style>
/* Change cursor when over entire map */
.leaflet-container {
  cursor: pointer !important;
}
</style>
