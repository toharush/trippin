import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import { Icon } from "leaflet";
import "./Map.css";

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
    <Box
      sx={{ backgroundColor: "#3E3E3E", height: "100vh", position: "relative" }}
    >
      <div className="map" id="map">
        <MapContainer center={startPosition} zoom={6} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={startPosition} icon={blackIcon}>
            <Popup>{startPositionName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </Box>
  );
}
