import HelloMap from '@/components/demos/HelloMap'
import GeomDemos from './geoms';
import SourceDemos from './sources';
import StyleDemos from './styles';
import AnalysisDemos from './analysis';

export default [
    HelloMap, 
    ...GeomDemos, 
    ...SourceDemos, 
    ...StyleDemos,
    ...AnalysisDemos
];