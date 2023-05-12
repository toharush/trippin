import { MapContainer, TileLayer } from "react-leaflet";
import { ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

interface MapsProps {
  children: ReactElement;
}
export default function Map({ children }: MapsProps) {
  const startPosition: [number, number] = [31.787638330100435, 34.633258031660375];

  return (
    <MapContainer
      center={startPosition}
      zoom={5}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{
        width: "67%",
      }}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
