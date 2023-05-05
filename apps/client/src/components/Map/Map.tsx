import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import FloatingCategories from "../../container/FloatingCategories/FloatingCategories";
import useMapDrawer from "../../hooks/useMapDrawer";

export default function Map() {
  const { markers } = useMapDrawer();
  const startPosition: [number, number] = [51.50853, -0.12574];

  return (
    <MapContainer
      center={startPosition}
      zoom={6}
      scrollWheelZoom={false}
      zoomControl={true}
      style={{
        width: "67%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl>
        <FloatingCategories />
      </LayersControl>
      {markers.map((mark) => mark.component)}
    </MapContainer>
  );
}
