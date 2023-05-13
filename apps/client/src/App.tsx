import { useEffect } from "react";
import { useActivities, useAuthentication } from "./hooks";
import SideBarContainer from "./container/SideBar/SideBar";
import Map from "./container/Map/Map";
import "./App.css";
import { useSelector } from "react-redux";
import { selectIsAppInitilized } from "./store/selectors/global";
import Splash from "./container/Splash/Splash";
import MapBody from "./container/MapBody/MapBody";
import UserMenu from "./container/UserMenu/UserMenu";

function App() {
  const isAppLoaded = useSelector(selectIsAppInitilized);
  const { fetchActivities } = useActivities();
  const { getCurrentUser } = useAuthentication();

  useEffect(() => {
    fetchActivities();
    getCurrentUser();
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
