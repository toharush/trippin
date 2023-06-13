import { Marker, Popup } from "react-leaflet";
import { Icon, PointTuple, IconOptions } from "leaflet";
import { useState } from "react";
import { EntityTypes, MarkerPoint } from "../../interfaces";
import { useEffect } from "react";
import Activity from "../Activity/Activity";

const basicPin = require("./pins/basic.png");
const restaurantPin = require("./pins/restaurant.png");
const barPin = require("./pins/bar.png");

const iconSize: PointTuple = [25, 41];
const iconAnchor: PointTuple = [12, 41];

interface MarkerPointProps {
  markerPoint: MarkerPoint;
}
const MapItem = (props: MarkerPointProps) => {
  const { markerPoint } = props;
  const [comp, setComp] = useState<JSX.Element>();
  const [icon, setIcon] = useState<IconOptions>({
    iconUrl: basicPin,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });

  const getIcon = (): IconOptions => {
    switch (markerPoint.type) {
      case EntityTypes.activity: {
        let newIconOptions: IconOptions = icon;
        if (markerPoint.name.toLowerCase().includes("bar")) {
          newIconOptions.iconUrl = barPin;
        } else if (
          markerPoint.name.toLowerCase().includes("restaurant")
        ) {
          newIconOptions.iconUrl = restaurantPin;
        }
        return newIconOptions;
      }
      default:
        return icon;
    }
  };

  const getComponet = () => {
    switch (markerPoint.type) {
      case EntityTypes.popup:
        return <Popup>{markerPoint.name}</Popup>;
      case EntityTypes.activity:
        return (
          <Popup>
            <Activity
              activity={markerPoint.data}
              minimized={true}
              isSelected={true}
            />
          </Popup>
        );
    }
  };

  useEffect(() => {
    setIcon(getIcon());
    setComp(getComponet());
  }, [markerPoint]);

  return (
    <Marker position={markerPoint.location} icon={new Icon(icon)}>
      {comp}
    </Marker>  );
};

export default MapItem;
