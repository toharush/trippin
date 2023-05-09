import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { ReactNode, ReactElement } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import FloatingCategories from "../../container/FloatingCategories/FloatingCategories";
import useMapDrawer from "../../hooks/useMapDrawer";
import MapItem from "../MarkerPoint/MapItem";
import DestintionsSearch from "../../container/DestinationsSearch/DestinationsSearch";

interface MapsProps {
  children: ReactElement
}
export default function Map({ children }: MapsProps) {
  const { markers } = useMapDrawer();
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
