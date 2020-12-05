import React from 'react';
import { Map as WorldMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'

function Map({ zoom, center }) {
    return (
        <WorldMap className='map' center={center} zoom={zoom}>
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">

            </TileLayer>
        </WorldMap>
    )
}

export default Map
