import Fab from "@mui/material/Fab";
import "./FloatingCategory.css";
import WineBarIcon from '@mui/icons-material/WineBar';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

interface FloatingCategoryProps {
  name: string;
  setFilter: Function;
  selected?: boolean;
}

const FloatingCategory = (props: FloatingCategoryProps) => {
  const { name, selected, setFilter } = props;
  let Icon = PlaceOutlinedIcon;

  const clickFilter = () => {
    setFilter(name);
  };

  if (name.toLowerCase() === "restaurant") {
    Icon = FastfoodIcon;
  } else if (name.toLowerCase() === "bar") {
    Icon = WineBarIcon;
  } else if (name.toLowerCase() === "museum") {
    Icon = MuseumOutlinedIcon;
  } else if (name.toLowerCase() === "night club") {
    Icon = NightlifeIcon;
  }

  return (
    <Fab
      style={{ backgroundColor: "white" }}
      variant="extended"
      onClick={clickFilter}
      className={
        selected
          ? "floatingCategory selectedFloatingCategory"
          : "floatingCategory"
      }
    >
      <Icon />
      <span>{name}</span>
    </Fab>
  );
};

export default FloatingCategory;
