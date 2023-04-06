import { useEffect } from "react";
import { useActivities } from "./hooks";
import SideBarContainer from "./container/SideBar/SideBar";
import Map from "./components/Map/Map";
import "./App.css";
import { useSelector } from "react-redux";
import { selectIsAppInitilized } from "./store/selectors/global";
import Splash from "./container/Splash/Splash";

function App() {
  const isAppLoaded = useSelector(selectIsAppInitilized);
  const { fetchActivities } = useActivities();

  useEffect(() => {
    fetchActivities();
  }, []);

  if (!isAppLoaded) return <Splash />;
  return (
    <div className="App">
      <SideBarContainer />
      <Map />
    </div>
  );
}

export default App;
