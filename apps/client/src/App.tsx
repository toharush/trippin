import { useEffect, useRef, useState } from "react";
import { useActivities } from "./hooks";
import SideBarContainer from "./container/SideBar/SideBar";
import Map from "./components/Map/Map";
import "./App.css";
import { useSelector } from "react-redux";
import { selectIsAppInitilized } from "./store/selectors/global";
import Splash from "./container/Splash/Splash";
import MapContainer from "./container/Map/Map";

function App() {
  const isAppLoaded = useSelector(selectIsAppInitilized);
  const { fetchActivities } = useActivities();
  const mapRef = useRef();

  useEffect(() => {
    fetchActivities();
    console.log(mapRef);
  }, [mapRef]);

  if (!isAppLoaded) return <Splash />;
  return (
    <div className="App">
      <SideBarContainer/>
      <MapContainer/>
    </div>
  );
}

export default App;
