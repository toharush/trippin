import "./Destination.css";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

interface props {
  name: string;
  handleFlyTo: ()=>void;
}

export default function Destination({ name, handleFlyTo}: props) {
return (
    <ListItem key={name}>
      <ListItemButton
        onClick={handleFlyTo}
        sx={{
          backgroundColor: "whitesmoke",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, .2)" },
          borderRadius: "5px",
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={`/static/images/avatar/${name + 1}.jpg`} />
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
