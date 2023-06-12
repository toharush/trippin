import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import { ITripActivity } from '../../interfaces';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./OneStopInDayRouteComponent.css"

interface props {
    activity: ITripActivity;
}

const OneStopInDayRouteComponent = ({ activity }: props) => {

  const formattedTime = (time: Date)=> {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  const startTime = formattedTime(activity.start_time);
  const endTime = formattedTime(activity.end_time);
  return (
    <div>
      <div className="vertical-line" />
      <DirectionsCarOutlinedIcon
        sx={{ color: "white" }}
      ></DirectionsCarOutlinedIcon>
      <span className="icon-details"></span>
      <div className="vertical-line" />
      <LocationOnIcon sx={{ color: "#86eaf0" }}></LocationOnIcon>
      <span className="icon-details">{activity.activity.title} ({startTime}-{endTime})</span>
    </div>
  );
};

export default OneStopInDayRouteComponent;
