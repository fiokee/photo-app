import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css'
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your actual public access token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.4194);
  const [lat, setLat] = useState(37.7749);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('load', () => {
      console.log('Map loaded successfully');

      // Add a marker with a custom icon
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundImage = 'url(https://placekitten.com/50/50)'; // Use your custom icon URL
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.backgroundSize = '100%';

      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML('<h3>San Francisco</h3><p>Golden Gate Bridge</p>'))
        .addTo(map.current);
    });

    map.current.on('error', (e) => {
      console.error('Mapbox GL Error:', e);
    });

    const updateMapValues = () => {
      const newLng = map.current.getCenter().lng.toFixed(4);
      const newLat = map.current.getCenter().lat.toFixed(4);
      const newZoom = map.current.getZoom().toFixed(2);

      setLng(newLng);
      setLat(newLat);
      setZoom(newZoom);

      console.log(`Longitude: ${newLng}, Latitude: ${newLat}, Zoom: ${newZoom}`);
    };

    map.current.on('move', updateMapValues);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }}>
        Loading Map...
      </div>
    </div>
  );
};

export default MapComponent;
