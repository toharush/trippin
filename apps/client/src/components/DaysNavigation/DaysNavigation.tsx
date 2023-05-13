import { Pagination, ThemeProvider, createTheme } from "@mui/material";
import { useState, useEffect } from "react";
import DayRouteContainer from "../../container/DayRoute/DayRoute";
import { DayRoute } from "../../interfaces/dayRoute/dayRoute";
import { selectDayRoutes } from "../../store";
import DayRouteComponent from "../DayRoute/DayRoute";
import "./DaysNavigation.css";

interface props {
    selectedDayRoutes: DayRoute[]
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#86eaf0',
      },
      action: {
        hover: 'rgba(0, 0, 0, .2)', // Custom color for hover state
      },
      text: {
        primary:"white",
      }
    },
  });



const DaysNavigation = ({selectedDayRoutes}:props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleDayChange=(index:number)=> {
        setActiveIndex(index);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="nav-container vertical-align">
                <Pagination count={selectedDayRoutes.length} shape="rounded" siblingCount={1} boundaryCount={2} color="primary" onChange={(event, index)=>handleDayChange(index-1)}></Pagination>
            </div>
            <DayRouteContainer dayRoute={selectedDayRoutes[activeIndex]}/>
        </ThemeProvider>
    );
}

export default DaysNavigation;