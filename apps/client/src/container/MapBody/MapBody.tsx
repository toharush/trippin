import { LayersControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useStepper, useMapDrawer } from "../../hooks";
import MapItem from "../../components/MarkerPoint/MapItem";
import FloatingCategories from "../FloatingCategories/FloatingCategories";
import ActivitiesSearch from "../ActivitiesSearch/ActivitiesSearch";
import "./MapBody.css";
import { MarkerPoint, stepperValues } from "../../interfaces";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";

const MapBody = () => {
  const map = useMap();
  const { selectedActivitiesMarkers, flyTo, selectedDayRoutes } = useMapDrawer();
  const { currentStep } = useStepper();

  const filteredPoints = selectedDayRoutes.flatMap((dayRoute) =>
    dayRoute.route.filter((point) => point.show === true)
);

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
      {(filteredPoints.map((point) => 
          <MapItem markerPoint={point} />
      ))
      }
    </>
  );
};

export default MapBody;
