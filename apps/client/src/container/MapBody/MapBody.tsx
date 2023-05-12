import { LayersControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useStepper, useMapDrawer } from "../../hooks";
import MapItem from "../../components/MarkerPoint/MapItem";
import FloatingCategories from "../FloatingCategories/FloatingCategories";
import ActivitiesSearch from "../ActivitiesSearch/ActivitiesSearch";
import "./MapBody.css";
import { stepperValues } from "../../interfaces";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";

const MapBody = () => {
  const map = useMap();
  const { selectedActivitiesMarkers, flyTo } = useMapDrawer();
  const { currentStep } = useStepper();

  useEffect(() => {
    map.flyTo(flyTo.latlng, flyTo.zoom);
  }, [flyTo]);

  return (
    <>
      <div className="leaflet-control search-control">
        {currentStep === stepperValues.Activities ? <ActivitiesSearch /> : null}
        {currentStep === stepperValues.Location ? <DestintionsSearch /> : null}
      </div>

      <LayersControl>
        <FloatingCategories />
      </LayersControl>
      {(selectedActivitiesMarkers.filter((marker) => marker.show === true)).map((mark) => (
        <MapItem markerPoint={mark} />
      ))}
    </>
  );
};

export default MapBody;
