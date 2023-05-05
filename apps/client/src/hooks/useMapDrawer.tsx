import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Icon } from "leaflet";

const useMapDrawer = () => {
  const markerIconPng = require("./bluePin.png");
  const blackIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  const [markers, setMarker] = useState<
    {
      id: string;
      name: string;
      type: "popup" | "marker";
      location: [number, number];
      icon?: Icon;
      component: any;
    }[]
  >([]);
  const addMarkerPoint = (obj: {
    id: string;
    type: "popup" | "marker";
    name: string;
    location: [number, number];
    icon?: Icon;
  }) => {
    const newObj = {
      ...obj,
      component:
        obj.type === "popup" ? (
          <Marker position={obj.location} icon={blackIcon}>
            <Popup>{obj.name}</Popup>
          </Marker>
        ) : (
          <Marker position={obj.location} icon={blackIcon}></Marker>
        ),
    };
    // @ts-ignore
    setMarker([...markers, newObj]);
  };
  return {
    markers,
    addMarkerPoint,
  };
};

export default useMapDrawer;
