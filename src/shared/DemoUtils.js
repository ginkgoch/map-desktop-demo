import path from 'path';

export default class DemoUtils {
    static resolveExtraResourcePath(filename) {
        if (process.env.NODE_ENV === 'development') {
            return path.resolve(process.resourcesPath, '../../../../../../extraResources', filename);
        }
        else {
            return path.resolve(__dirname, '../extraResources', filename)
        }
    }
}