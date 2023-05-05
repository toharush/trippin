import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";
import { EntityTypes, MarkerPoint } from "../../interfaces";
import { useEffect } from "react";

const markerIconPng = require("./bluePin.png");

export const blueIcon = new Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MarkerPointProps {
  markerPoint: MarkerPoint;
}
const MapItem = (props: MarkerPointProps) => {
  const [comp, setComp] = useState<any>();
  const [icon, setIcon] = useState<any>(blueIcon);
  const { markerPoint } = props;
  const getIcon = () => {
    
  };

  const getComponet = () => {
    if (markerPoint.type === EntityTypes.popup) {
      setComp(<Popup>{markerPoint.name}</Popup>);
    }
  };

  useEffect(() => {
    getIcon();
    getComponet();
  }, [markerPoint]);

  return (
    <Marker position={markerPoint.location} icon={icon}>
      {comp}
    </Marker>
  );
};

export default MapItem;
