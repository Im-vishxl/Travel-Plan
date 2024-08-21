import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  return (
    <MapContainer 
        center={[11.8745, 75.3704]} 
        zoom={10} 
        style={{ width: '100%', height: '100vh' }}
    >
        <TileLayer 
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
    </MapContainer>
  );
}

export default MapComponent;
