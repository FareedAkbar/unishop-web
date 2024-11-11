
"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker images
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react';

// Define a type that extends the existing Leaflet Icon Default
interface LeafletIconDefault extends L.Icon.Default {
  _getIconUrl?: (name: string) => string; // Specify the method you need to modify
}

// Fix marker icon issue
const defaultIcon = L.Icon.Default.prototype as LeafletIconDefault;
delete defaultIcon._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});
// Define a custom icon
const customIcon = L.icon({
  iconUrl: "/assets/icons/location.png",
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});

type height = {
  height: number
}
 function Map ({height} : height) {
  const position: [number, number] = [-34.40755818806117, 150.87911127658157];

  useEffect(() => {
    return () => {
      // Cleanup any existing map instance
      if (document.querySelector('.leaflet-container')) {
        document.querySelector('.leaflet-container')?.remove();
      }
    };
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: `${height}px`, width: '100%', borderRadius: "10px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          Custom Marker
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
