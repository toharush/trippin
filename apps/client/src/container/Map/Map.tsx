import { MapContainer, TileLayer } from "react-leaflet";
import { ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

interface MapsProps {
  children: ReactElement;
}
export default function Map({ children }: MapsProps) {
  const startPosition: [number, number] = [37.53044, -95.65938];

  return (
    <MapContainer
      center={startPosition}
      zoom={4}
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
