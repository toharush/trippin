import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import "./OneStopComponent.css";

const OneStopComponent =()=> {
  
    return (
      <>
      
      
      <div className="vertical-line" />
      <DirectionsCarOutlinedIcon sx={{color:"white", position:"relative"}}></DirectionsCarOutlinedIcon>
      <div className="vertical-line" />
      <LocationOnIcon sx={{color:"aqua", position:"relative"}}></LocationOnIcon>
      </>
    );
  }
  
  export default OneStopComponent;