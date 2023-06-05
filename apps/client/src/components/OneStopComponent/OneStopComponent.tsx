import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import "./OneStopComponent.css";
import { Stack } from '@mui/material';
import { Activity, MarkerPoint } from '../../interfaces';

interface props {
  activity: MarkerPoint
}

const OneStopComponent =({activity}:props)=> {
  
    return (
      <div>
        <div className="vertical-line" />
        <DirectionsCarOutlinedIcon sx={{color:"white"}}></DirectionsCarOutlinedIcon>
        <span className="icon-details">{activity.name}</span>
        <div className="vertical-line" />
        <LocationOnIcon sx={{color:"#86eaf0"}}></LocationOnIcon>
        <span className="icon-details">{activity.name}</span>
      </div>
    );
  }
  
  export default OneStopComponent;