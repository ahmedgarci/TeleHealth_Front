import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  mode: "View" | "Select";
  location?: LatLng; 
  state?: LatLng;
  setSate?: React.Dispatch<React.SetStateAction<LatLng|null>>;
};

const ClickMarker: React.FC<{ onSelect: (latlng: LatLng) => void }> = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      console.log(e);
      onSelect(e.latlng);
    },
  });
  return null;
};

const MapComponent: React.FC<MapProps> = ({ mode, location, state, setSate }) => {
  const fallbackCenter: LatLngExpression = [37.2744, 9.8739];

  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(
    mode === 'View' && location ? location :
    mode === 'Select' && state ? state :
    null
  );

  useEffect(() => {
    if (mode === 'View' && location) {
      setMarkerPosition(location);
    }
    if (mode === 'Select' && state) {
      setMarkerPosition(state);
    }
  }, [location, state, mode]);

  const handleSelect = (latlng: LatLng) => {
    setMarkerPosition(latlng);
    if (setSate) setSate(latlng);
  };

  const center: LatLngExpression = markerPosition ?? fallbackCenter;

  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mode === "Select" && <ClickMarker onSelect={handleSelect} />}
      {markerPosition && <Marker position={markerPosition} />}
    </MapContainer>
  );
};

export default MapComponent;
