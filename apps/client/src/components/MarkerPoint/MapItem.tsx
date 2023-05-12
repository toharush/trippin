import {
  Marker,
  Popup,
} from "react-leaflet";
import { Icon, PointTuple } from "leaflet";
import { useState } from "react";
import { EntityTypes, MarkerPoint } from "../../interfaces";
import { useEffect } from "react";
import Activity from "../Activity/Activity";

const basicPin = require("./pins/basic.png");
const restaurantPin = require("./pins/restaurant.png");
const barPin = require("./pins/bar.png");

const iconSize: PointTuple = [25, 41];
const iconAnchor: PointTuple = [12, 41];

export const basicIcon = new Icon({
  iconUrl: basicPin,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});

export const restaurantIcon = new Icon({
  iconUrl: restaurantPin,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});

export const barIcon = new Icon({
  iconUrl: barPin,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
});

interface MarkerPointProps {
  markerPoint: MarkerPoint;
}
const MapItem = (props: MarkerPointProps) => {
  const [comp, setComp] = useState<any>();
  const [icon, setIcon] = useState<any>(basicIcon);
  const { markerPoint } = props;

  const getIcon = () => {
    switch (markerPoint.type) {
      case EntityTypes.activity:
        switch (markerPoint.data.category.name) {
          case "bar_pub":
            return barIcon;
          case "Restaurant":
            return restaurantIcon;
          default:
            return basicIcon;
        }
      default:
        return basicIcon;
    }
  };

  const getComponet = () => {
    switch (markerPoint.type) {
      case EntityTypes.popup:
        return <Popup>{markerPoint.name}</Popup>;
      case EntityTypes.activity:
        return (
          <Popup>
            <Activity activity={markerPoint.data} minimized={true} isSelected={true} />
          </Popup>
        );
    }
  };

  let returnValue;
  const setReturnValue = () => {
    if (markerPoint.show) {
      returnValue = <Marker position={markerPoint.location} icon={icon}>
        {comp}
      </Marker>
    }
    else {
      returnValue = null;
    }
  }

  useEffect(() => {
    setIcon(getIcon());
    setComp(getComponet());
    // setReturnValue();
  }, [markerPoint]);



  

  return (
    <Marker position={markerPoint.location} icon={icon}>
      {comp}
    </Marker>  );
};

export default MapItem;
