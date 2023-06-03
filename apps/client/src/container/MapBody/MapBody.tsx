import { LayersControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useMapDrawer } from "../../hooks";
import MapItem from "../../components/MapItem/MapItem";
import FloatingCategories from "../FloatingCategories/FloatingCategories";
import ActivitiesSearch from "../ActivitiesSearch/ActivitiesSearch";
import "./MapBody.css";

const MapBody = () => {
  const map = useMap();
  const { markers, flyTo } = useMapDrawer();

  useEffect(() => {
    map.flyTo(flyTo.latlng, flyTo.zoom);
  }, [flyTo]);

  return (
    <>
      <div className="leaflet-control search-control ml-3">
        <ActivitiesSearch />
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
