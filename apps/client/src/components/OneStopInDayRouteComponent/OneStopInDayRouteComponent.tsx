import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import { ITripActivity } from '../../interfaces';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface props {
    activity: ITripActivity;
}

const OneStopInDayRouteComponent = ({ activity }: props) => {
  return (
    <div>
      <div className="vertical-line" />
      <DirectionsCarOutlinedIcon
        sx={{ color: "white" }}
      ></DirectionsCarOutlinedIcon>
      <span className="icon-details">{activity.activity.title}</span>
      <div className="vertical-line" />
      <LocationOnIcon sx={{ color: "#86eaf0" }}></LocationOnIcon>
      <span className="icon-details">{activity.activity.title}</span>
    </div>
  );
};

export default OneStopInDayRouteComponent;
