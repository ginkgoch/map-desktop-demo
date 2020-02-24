import L from "leaflet";

const defaultStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 4,
    opacity: 1,
    fillOpacity: 0.4
};
const defaultOSMAttribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
const defaultOSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default {
    OSM_ATTRIBUTION: defaultOSMAttribution,
    OSM_SERVICE_URL: defaultOSMUrl,
    DEFAULT_OSM_OPTIONS: {
        attribution: defaultOSMAttribution
    },
    DEFAULT_GEO_JSON_STYLE: defaultStyle,
    DEFAULT_GEO_JSON_OPTIONS: {
        style: defaultStyle,
        pointToLayer(feature, latlng) {
            return L.circleMarker(latlng, defaultStyle);
        }
    }
}