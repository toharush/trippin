import { LayersControl, TileLayer, useMap } from "react-leaflet";
import Map from "../../components/Map/Map";
import MapItem from "../../components/MarkerPoint/MapItem";
import useMapDrawer from "../../hooks/useMapDrawer";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";
import FloatingCategories from "../FloatingCategories/FloatingCategories";

const MapContainer = () => {
  const { markers } = useMapDrawer();

  return (
    <Map>
      <div className="leaflet-control">
        <DestintionsSearch
          title="Search for destinations .."
          searchingDests={true}
        ></DestintionsSearch>
      </div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl>
        <FloatingCategories />
      </LayersControl>
      {markers.map((mark) => (
        <MapItem markerPoint={mark} />
      ))}
    </Map>
  );
};

export default MapContainer;
