import { useEffect, useRef, useState } from "react";
import { useActivities } from "./hooks";
import SideBarContainer from "./container/SideBar/SideBar";
import Map from "./components/Map/Map";
import "./App.css";
import { useSelector } from "react-redux";
import { selectIsAppInitilized } from "./store/selectors/global";
import Splash from "./container/Splash/Splash";
import { MapContainer } from "react-leaflet";
import MapBody from "./container/Map/Map";

function App() {
  const isAppLoaded = useSelector(selectIsAppInitilized);
  const { fetchActivities } = useActivities();
  const startPosition: [number, number] = [37.53044, -95.65938];

  useEffect(() => {
    fetchActivities();
  }, []);

  if (!isAppLoaded) return <Splash />;
  return (
    <div className="App">
      <SideBarContainer />
      <Map>
        <MapBody />
      </Map>
    </div>
  );
}

export default App;
