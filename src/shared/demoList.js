import _ from 'lodash';
import examples from '../components/examples';

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

export default examples.map(getExampleInfo);