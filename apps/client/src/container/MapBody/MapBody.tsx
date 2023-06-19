import { LayersControl, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useMapDrawer, useStepper } from "../../hooks";
import MapItem from "../../components/MapItem/MapItem";
import FloatingCategories from "../FloatingCategories/FloatingCategories";
import ActivitiesSearch from "../ActivitiesSearch/ActivitiesSearch";
import "./MapBody.css";
import { stepperValues } from "../../interfaces";
import { Polyline } from "leaflet";
import L from "leaflet";

const MapBody = () => {
  const map = useMap();
  const { markers, flyTo, routesMarkers } = useMapDrawer();
  const { currentStep } = useStepper();

  const polyLineRef = useRef<L.Polyline>();

  useEffect(() => {
    if (polyLineRef.current) {
      polyLineRef.current.removeFrom(map);
    }
    const filteredPointsLocations: [number, number][] = routesMarkers.map(
      (point) => point.location
    );
    const polyLine = L.polyline(filteredPointsLocations, {
      color: "black",
      weight: 1,
      dashArray: "5,8",
    });
    polyLine.addTo(map);
    polyLineRef.current = polyLine;

    map.flyTo(flyTo.latlng, flyTo.zoom);
  }, [flyTo, routesMarkers]);

  return (
    <>
      <div className="leaflet-control search-control">
        {currentStep === stepperValues.Activities ? <ActivitiesSearch /> : null}
      </div>
      {currentStep === stepperValues.Activities ? (
        <LayersControl>
          <FloatingCategories />
        </LayersControl>
      ) : null}
      {currentStep === stepperValues.Activities
        ? markers.map((mark) => <MapItem markerPoint={mark} />)
        : null}
      {currentStep === stepperValues.Results
        ? routesMarkers.map((mark) => <MapItem markerPoint={mark} />)
        : null}
    </>
  );
};

export default MapBody;
