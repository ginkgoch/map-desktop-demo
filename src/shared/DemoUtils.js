import fs from 'fs';
import path from 'path';
import { GeometryFactory, Projection, Feature } from 'ginkgoch-map';

export default class DemoUtils {
    static resolveExtraResourcePath(filename) {
        if (process.env.NODE_ENV === 'development') {
            return path.resolve(process.resourcesPath, '../../../../../../extraResources', filename);
        }
        else {
            return path.resolve(__dirname, '../extraResources', filename)
        }
    }

    static convertEnvelopeToFeature(envelope, envelopeCRS = undefined, targetCRS = undefined) {
        let polygon = GeometryFactory.envelopeAsPolygon(envelope);
        if (envelopeCRS !== undefined && targetCRS != undefined && envelopeCRS !== targetCRS) {
            let proj = new Projection(envelopeCRS, targetCRS);
            polygon = proj.forward(polygon);
        }

        let feature = new Feature(polygon);
        return feature;
    }

    static storeEnvelopeAsGeoJSON(fileName, envelope, envelopeCRS = undefined, targetCRS = undefined) {
        let features = this.convertEnvelopeToFeature(envelope, envelopeCRS, targetCRS);
        let featuresJSON = features.toJSON();
        fileName = this.resolveExtraResourcePath(fileName);
        fs.writeFileSync(fileName, JSON.stringify(featuresJSON));
    }
}