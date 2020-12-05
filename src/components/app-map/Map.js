import React from 'react';
import { Map as WorldMap, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';
import './Map.css';
const DrawCircles = (data, type = 'cases') => {
    const mode = {
        cases: {
            color: 'red',
        },
        recovered: {
            color: 'green',
        },
        deaths: {
            color: 'black',
        }
    }
    return (
        data.map((country, index) =>
            <Circle key={index} center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
                fillOpacity={0.3}
                color={mode[type].color}
                fillColor={mode[type].color}
                radius={Math.sqrt(country[type]) * 600}
            >
                <Popup className='map__popup'>
                    <img src={country.countryInfo.flag} alt={data.country} />
                    <div>Cases:{numeral(country.cases).format("0,0")}</div>
                    <div>Recovered:{numeral(country.rocovered).format("0,0")}</div>
                    <div>Deaths:{numeral(country.death).format("0,0")}</div>
                </Popup>
            </Circle>
        )
    );
}
function Map({ zoom, center, data, type }) {
    return (
        <WorldMap className='map' center={center} zoom={zoom}>
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">

            </TileLayer>
            {DrawCircles(data, type)}
        </WorldMap>
    )
}

export default Map
