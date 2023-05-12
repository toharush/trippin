import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import FloatingCategories from "../../container/FloatingCategories/FloatingCategories";
import useMapDrawer from "../../hooks/useMapDrawer";
import MapItem from "../MarkerPoint/MapItem";

export default function Map() {
  const { markers } = useMapDrawer();
  const startPosition: [number, number] = [37.53044, -95.65938];

  return (
    <MapContainer
      center={startPosition}
      zoom={4}
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
      {(markers.filter((marker) => marker.show === true)).map((mark) => (
        <MapItem markerPoint={mark} />
      ))}
      {/* {markers.map((mark) => (
        <MapItem markerPoint={mark} />
      ))} */}
    </MapContainer>
  );
}
