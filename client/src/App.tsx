import { useEffect } from "react";
import GridComponent from "./components/GridComponent/GridComponent";
import { useActivities } from "./hooks";

function App() {
  const { fetchActivities } = useActivities();

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <GridComponent />
    </>
  );
}

export default App;
