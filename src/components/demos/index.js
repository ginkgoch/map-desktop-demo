import HelloMap from '@/components/demos/HelloMap'
import LoadShapefile from '@/components/demos/LoadShapefile'
import GeomDemos from './geoms';
import SourceDemos from './sources';
import StyleDemos from './styles';

export default [
    HelloMap, 
    LoadShapefile, 
    ...GeomDemos, 
    ...SourceDemos, 
    ...StyleDemos
];