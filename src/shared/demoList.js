import _ from 'lodash';
import examples from '../components/examples';

function getExampleInfo(example) {
    let { name, route, title, path, desc } = example;
    if (name === undefined) {
        throw new Error('name not defined.');
    }

    path = path === undefined ? name : path;
    title = title || _.startCase(name);
    route = route || name;
    desc = desc || '';
    return [route, title, path, desc, example];
}

export default examples.map(example => {
    return getExampleInfo(example);
});