import Memory from '@/components/demos/sources/Memory'
import Shapefile from '@/components/demos/sources/Shapefile'
import DelimitedFile from '@/components/demos/sources/DelimitedFile'
import GeoJSON from '@/components/demos/sources/GeoJSON'
import MultiSource from '@/components/demos/sources/MultiSource'
import ExportToGeoJSON from '@/components/demos/sources/ExportToGeoJSON';
import ExportToCSV from '@/components/demos/sources/ExportToCSV';

let demos = [  
    Memory, Shapefile, DelimitedFile, GeoJSON, MultiSource, ExportToGeoJSON, ExportToCSV
]

export default demos;