import React from 'react';
import { Map as WorldMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import numeral from 'numeral';
import './Map.css';
import markerIcon from './redMarker.png';


var myIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 22],
    iconAnchor: [19, 21],
    popupAnchor: [-10, -21],
});
const mapDataToPoints = (data, type) => {
    const points = data.map(country => {
        let intensity = country[type];
        return ([country.countryInfo.lat, country.countryInfo.long, intensity])
    });
    return points;

}
function Map({ zoom, center, data, type, mode }) {
    console.log('mod... ', mode);
    return (
        <WorldMap className='map' center={center} zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                minOpacity={1}
                blur={0}
                radius={3 * zoom}
                gradient={mode}
                points={mapDataToPoints(data, type)}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])} />
            { data.map((country, index) => (
                <Marker key={index} position={[country.countryInfo.lat, country.countryInfo.long]} icon={myIcon}>
                    <Popup className='map__popup'>
                        <img src={country.countryInfo.flag} alt={data.country} />
                        <div>Cases:{numeral(country.cases).format("0,0")}</div>
                        <div>Recovered:{numeral(country.recovered).format("0,0")}</div>
                        <div>Deaths:{numeral(country.deaths).format("0,0")}</div>
                    </Popup>
                </Marker>
            ))}
        </WorldMap>
    )
}

export default Map
