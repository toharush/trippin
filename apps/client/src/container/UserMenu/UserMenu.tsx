import UserMenuComponent from "../../components/UserMenuComponent/UserMenuComponent";
import { useAuthentication, useTrip } from "../../hooks";
import { useState } from "react";
import UserManagment from "../UserManagment/UserManagment";
import { Dialog } from "@mui/material";

const UserMenu = () => {
  const { currentUser, SignOut } = useAuthentication();
  const [open, setOpen] = useState<boolean>(false);
  const [chosen, setChosen] = useState<string>("");
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChoseTab = (title: string) => {
    setChosen(title);
    handleClick();
  };

  return (
    <>
      <UserMenuComponent
        title={currentUser!.email!}
        handleChosenTab={handleChoseTab}
        handleLogOut={SignOut}
      />
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {chosen === "usermanagment" ? <UserManagment /> : null}
        {chosen === "settings" ? <div>{chosen}</div> : null}
        {chosen === "share" ? <div>{chosen}</div> : null}
        {chosen === "profile" ? <div>{chosen}</div> : null}
      </Dialog>
    </>
  );
};

export default UserMenu;
