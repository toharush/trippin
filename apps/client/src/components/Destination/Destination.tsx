import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

interface props {
  name: string;
  handleClick: ()=>void;
}

export default function Destination({ name, handleClick}: props) {
return (
    <ListItem key={name}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          backgroundColor: "whitesmoke",
          "&:hover": { backgroundColor: "#d4d4d4" },
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
