import { MapContainer, TileLayer, LayersControl, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import FloatingCategories from "../../container/FloatingCategories/FloatingCategories";
import useMapDrawer from "../../hooks/useMapDrawer";
import SearchComponent from "../SearchComponent/SearchComponent";
import DestintionsSearch from "../../container/DestinationsSearch/DestinationsSearch";

export default function Map() {
  const { markers } = useMapDrawer();
  const startPosition: [number, number] = [51.50853, -0.12574];

  return (
    <MapContainer
      center={startPosition}
      zoom={6}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{
        width: "67%",
      }}
      id="map"
    >
      <div className="leaflet-control">
      <DestintionsSearch title="Search for destinations .." searchingDests={true}></DestintionsSearch>
      </div>
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
