import { LayersControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useMapDrawer, useStepper } from "../../hooks";
import MapItem from "../../components/MapItem/MapItem";
import FloatingCategories from "../FloatingCategories/FloatingCategories";
import ActivitiesSearch from "../ActivitiesSearch/ActivitiesSearch";
import "./MapBody.css";
import { MarkerPoint, stepperValues } from "../../interfaces";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";
import { Polyline } from "leaflet";
import L from 'leaflet';

const MapBody = () => {
  const map = useMap();
  const { selectedActivitiesMarkers, flyTo, selectedDayRoutes } = useMapDrawer();
  const { currentStep } = useStepper();

  const filteredPoints = selectedDayRoutes.flatMap((dayRoute) =>
    dayRoute.route.filter((point) => point.show === true)
  );


  const filteredPointsLocations: [number,number][] = filteredPoints.map((point)=> point.location);
  const polyLine = L.polyline(filteredPointsLocations,{color:'black',weight:1,dashArray:'5,8'});

  useEffect(() => {
    map.flyTo(flyTo.latlng, flyTo.zoom);
    polyLine.addTo(map);
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
      {(selectedActivitiesMarkers.filter((marker) => marker.show === true)).map((mark) => (
         <MapItem markerPoint={mark} />
      ))}
      {(filteredPoints.map((point) => 
          <MapItem markerPoint={point} />
      ))}
    </>
  );
};

export default MapBody;