import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import { AddMarkerPoint, RemoveMarkerPoint } from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();

  const markerIconPng = require("./bluePin.png");
  const blueIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const markers = useSelector(selectMarkerPoints);
  const addMarker = async (markerPoint: MarkerPoint) => {
    await dispatch(AddMarkerPoint(markerPoint));
  };
  const removeMarker = async (id: string) => {
    await dispatch(RemoveMarkerPoint(id));
  };

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
          <Marker position={obj.location} icon={blueIcon}>
            <Popup>{obj.name}</Popup>
          </Marker>
        ) : (
          <Marker position={obj.location} icon={blueIcon}></Marker>
        ),
    };
    // @ts-ignore
    addMarker(newObj);
  };
  const removeMarkerPoint = (id: string) => {
    removeMarker(id);
  };
  return {
    markers,
    addMarkerPoint,
    removeMarkerPoint,
  };
};

export default useMapDrawer;
