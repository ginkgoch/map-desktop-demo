<template>
  <div>
    <div id="mapContainer"></div>
    <section>
      <button @click="saveAsCSVFile" class="btn btn-outline-success">Save as CSV File</button>
      <p><small class="text-muted text-sm">{{ summary }}</small></p>
    </section>
  </div>
</template>

<script>
import fs from 'fs';
import path from 'path';
import L from "leaflet";
import { remote } from 'electron';
import Constants from "../../../shared/Constants";
import DemoUtils from '../../../shared/DemoUtils';
import { FeatureGridLayer, MapUtils } from 'ginkgoch-leaflet-extensions';
import { FeatureLayer, GeneralStyle, ShapefileFeatureSource, Feature, MemoryFeatureSource, CSVFeatureSource } from 'ginkgoch-map';

export default {
  name: "export-to-csv",
  title: 'Export to CSV',
  source: '/sources/ExportToCSV',
  desc: `Export features into CSV`,
  detail: `Convert the highlighted features into CSV format and store as a new file.`,
  data() {
    return {
      summary: ''
    };
  },
  async mounted() {
    this.map = L.map("mapContainer").setView([0, 0], 2);
    L.tileLayer(Constants.OSM_SERVICE_URL, Constants.DEFAULT_OSM_OPTIONS).addTo(this.map);

    this.featureSource = new ShapefileFeatureSource(DemoUtils.resolveExtraResourcePath('cntry02.shp'));
    let featureLayer = new FeatureLayer(this.featureSource);
    featureLayer.styles.push(new GeneralStyle('rgba(222,235,247,0.5)', 'black', 1, 6));

    this.queryTarget = getQueryTargetFeature();
    let queryTargetSource = new MemoryFeatureSource([this.queryTarget]);
    let queryTargetLayer = new FeatureLayer(queryTargetSource);
    queryTargetLayer.styles.push(new GeneralStyle('rgba(254,230,206,0.5)', '#d95f0e', 2, 6));

    await featureLayer.open();
    let highlightFeatures = await this.featureSource.query('intersection', this.queryTarget.geometry, 'EPSG:3857');
    this.highlightSource = new MemoryFeatureSource(highlightFeatures);
    let highlightLayer = new FeatureLayer(this.highlightSource);
    highlightLayer.styles.push(new GeneralStyle('rgba(230,85,13,0.6)', '#e6550d', 1, 6));

    this.gridLayer = new FeatureGridLayer(undefined, { noWrap: true });
    this.gridLayer.pushLayer(featureLayer);
    this.gridLayer.pushLayer(queryTargetLayer);
    this.gridLayer.pushLayer(highlightLayer);
    this.gridLayer.addTo(this.map);

    let envelope = await featureLayer.envelope();
    MapUtils.setEnvelope(this.map, envelope);
  },
  methods: {
    async saveAsCSVFile() {
      let { dialog } = remote;
      let defaultPath = path.resolve('~/cntry02.csv');
      let filePath = dialog.showSaveDialogSync({ defaultPath, filters: [{ extensions: ['.csv'] }] });
      if (filePath !== undefined) {
        let features = this.highlightSource.internalFeatures;
        let fields = await this.featureSource.fields();
        let fieldOptions = { fields: fields.map(f => f.name), geomField: 'WKT' };
        CSVFeatureSource.create(filePath, ',', fieldOptions, features);
        this.summary = `CSV is successfully saved at ${filePath}.`;
      }
    }
  }
};

function getQueryTargetFeature() {
  let jsonContent = fs.readFileSync(DemoUtils.resolveExtraResourcePath('query-target.json')).toString();
  let queryTarget = Feature.create(JSON.parse(jsonContent));
  return queryTarget;
}
</script>
