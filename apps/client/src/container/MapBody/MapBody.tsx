import { LayersControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useMapDrawer, useStepper } from "../../hooks";
import MapItem from "../../components/MapItem/MapItem";
import FloatingCategories from "../FloatingCategories/FloatingCategories";
import ActivitiesSearch from "../ActivitiesSearch/ActivitiesSearch";
import "./MapBody.css";
import { stepperValues } from "../../interfaces";

const MapBody = () => {
  const map = useMap();
  const { markers, flyTo } = useMapDrawer();
  const { currentStep } = useStepper();

  useEffect(() => {
    map.flyTo(flyTo.latlng, flyTo.zoom);
  }, [flyTo]);

  return (
    <>
      <div className="leaflet-control search-control">
        {currentStep === stepperValues.Activities ? <ActivitiesSearch /> : null}
      </div>
      {currentStep === stepperValues.Activities ?
      (<LayersControl>
        <FloatingCategories />
      </LayersControl>) : null}
      {markers.map((mark) => (
        <MapItem markerPoint={mark} />
      ))}
    </>
  );
};

export default MapBody;