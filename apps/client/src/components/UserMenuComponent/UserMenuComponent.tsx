import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import IconButton from "@mui/joy/IconButton";
import { AvatarGroup, SvgIcon } from "@mui/material";

interface UserMenuProps {
  userNames: string[];
  handleClick: Function;
}
export default function UserMenu(props: UserMenuProps) {
  const { userNames, handleClick } = props;

  const onClick = () => handleClick();
  return (
    <AvatarGroup
      onClick={onClick}
      sx={{
        justifyContent: "flex-end",
        margin: "1%",
      }}
      max={3}
    >
      {userNames.map((userName) => (
        <Avatar key={userName} variant="solid">
          {userName[0]}
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
