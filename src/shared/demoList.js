import _ from 'lodash';
import examples from '../components/examples';

function getExampleInfo(component) {
    let { name, route, title, path, desc } = component;
    if (name === undefined) {
        throw new Error('name not defined.');
    }

    path = path === undefined ? name : path;
    title = title || _.startCase(name);
    route = route || name;
    desc = desc || '';
    return { route, title, path, desc, component };
}

export default examples.map(getExampleInfo);