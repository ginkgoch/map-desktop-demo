import L from "leaflet";

let defaultStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 4,
    opacity: 1,
    fillOpacity: 0.4
};

export default {
    OSM_ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
    OSM_SERVICE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    DEFAULT_GEO_JSON_STYLE: defaultStyle,
    DEFAULT_GEO_JSON_OPTIONS: {
        style: defaultStyle,
        pointToLayer(feature, latlng) {
            return L.circleMarker(latlng, defaultStyle);
        }
    }
}