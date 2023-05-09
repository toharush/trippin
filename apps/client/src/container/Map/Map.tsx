import { LayersControl, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import MapItem from "../../components/MarkerPoint/MapItem";
import useMapDrawer from "../../hooks/useMapDrawer";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";
import FloatingCategories from "../FloatingCategories/FloatingCategories";

const MapBody = () => {
  const map = useMap();
  const { markers, flyTo } = useMapDrawer();

  useEffect(() => {
    map.flyTo(flyTo.latlng, flyTo.zoom);
  }, [flyTo]);

  return (
    <>
      <div className="leaflet-control">
        <DestintionsSearch
          title="Search for destinations .."
          searchingDests={true}
        ></DestintionsSearch>
      </div>

      <LayersControl>
        <FloatingCategories />
      </LayersControl>
      {markers.map((mark) => (
        <MapItem markerPoint={mark} />
      ))}
    </>
  );
};

export default MapBody;
