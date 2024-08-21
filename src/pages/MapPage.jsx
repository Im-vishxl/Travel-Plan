import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import './MapPage.css';

const MapPage = () => {
  const location = useLocation();
  const { coordinatesData } = location.state || {};
  const [placeDetails, setPlaceDetails] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!coordinatesData || coordinatesData.length === 0) return;

    // Ensure map container is set up
    if (mapRef.current) {
      mapRef.current.off();
      mapRef.current.remove();
    }

    // Initialize the map
    const map = L.map('map', { center: [coordinatesData[0][1], coordinatesData[0][0]], zoom: 13 });
    mapRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Convert coordinates to [lat, lng] format
    const routeCoordinates = coordinatesData.map(coord => [coord[1], coord[0]]);

    // Initialize Leaflet Routing Machine
    const control = L.Routing.control({
      waypoints: routeCoordinates.map(coord => L.latLng(coord[0], coord[1])),
      routeWhileDragging: true,
      showAlternatives: true,
      altLineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'blue', opacity: 1, weight: 2 }
        ]
      }
    }).addTo(map);

    // Log waypoints to ensure they are set correctly
    console.log('Waypoints:', control.getWaypoints());

    // Fetch details about places (dummy data for now)
    fetchPlaceDetails(coordinatesData);

    // Invalidate map size after everything is rendered
    map.invalidateSize();

  }, [coordinatesData, isSidebarOpen]);

  const fetchPlaceDetails = async (coordinates) => {
    // Dummy data for demonstration
    const details = coordinates.map((coord, index) => ({
      name: `Place ${index + 1} near ${coord[0]}, ${coord[1]}`,
      attractions: `Famous attractions for place ${index + 1}`,
      busyTimes: `Busy times info for place ${index + 1}`,
      otherInfo: `Other information for place ${index + 1}`
    }));
    setPlaceDetails(details);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`map-page ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div id="map" className="map"></div>
      <div className="sidebar">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Hide Info' : 'Show Info'}
        </button>
        {isSidebarOpen && (
          <>
            <h2>Place Details</h2>
            {placeDetails.map((place, index) => (
              <div key={index} className="place-details">
                <h3>{place.name}</h3>
                <p><strong>Attractions:</strong> {place.attractions}</p>
                <p><strong>Busy Times:</strong> {place.busyTimes}</p>
                <p><strong>Other Info:</strong> {place.otherInfo}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MapPage;
