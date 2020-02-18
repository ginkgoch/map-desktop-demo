import HelloMap from '@/components/demos/HelloMap'
import LoadShapefile from '@/components/demos/LoadShapefile'
import GeomDemos from './geoms';
import SourceDemos from './sources';

export default [
    HelloMap, LoadShapefile, ...GeomDemos, ...SourceDemos
];