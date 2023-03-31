import { useEffect } from "react";
import { useActivities } from "./hooks";
import SideBarContainer from "./container/SideBar/SideBar";
import Map from "./components/Map/Map";
import "./App.css";

function App() {
  const { fetchActivities } = useActivities();

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="App">
      <SideBarContainer />
      <Map />
    </div>
  );
}

export default App;
