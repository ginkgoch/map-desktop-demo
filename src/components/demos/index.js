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

export let DemoCategories = {
    'Getting Started': [HelloMap],
    'Geometries': GeomDemos,
    'Feature Sources': SourceDemos,
    'Styles': StyleDemos,
    'Spatial Analysis': AnalysisDemos
}

export let DemoColumnConfig = [
    ['Getting Started', 'Geometries'],
    ['Feature Sources'],
    ['Styles', 'Spatial Analysis']
];