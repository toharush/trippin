import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import FloatingCategory from "../FloatingCategory/FloatingCategory";
import FloatingCategories from "../../container/FloatingCategories/FloatingCategories";

export default function Map() {
  const startPosition: [number, number] = [51.50853, -0.12574];
  const startPositionName = "London";
  const markerIconPng = require("./bluePin.png");
  const blackIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={startPosition}
      zoom={6}
      scrollWheelZoom={false}
      zoomControl={false}
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

      <Marker position={startPosition} icon={blackIcon}>
        <Popup>{startPositionName}</Popup>
      </Marker>
    </MapContainer>
  );
}
