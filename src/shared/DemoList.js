import _ from 'lodash';
import demos, { DemoCategories, DemoColumnConfig } from '../components/demos';

function getExampleInfo(component) {
    let { name, route, title, path, desc, detail } = component;
    if (name === undefined) {
        throw new Error('name not defined.');
    }

    path = path === undefined ? name : path;
    title = title || _.startCase(name);
    route = route || _.chain(name).camelCase().capitalize().value();
    desc = desc || '';
    detail = detail || '';
    return { route, title, path, desc, detail, component };
}

export default demos.map(getExampleInfo);

export let demoCategories = _.chain(DemoCategories).keys().map(k => {
    let inCategoryDemos = DemoCategories[k];
    inCategoryDemos = inCategoryDemos.map(getExampleInfo);
    return { name: k, demos: inCategoryDemos };
}).value();

export let demoColumnConfig = DemoColumnConfig;