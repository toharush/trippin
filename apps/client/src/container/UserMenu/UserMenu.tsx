import UserMenuComponent from "../../components/UserMenuComponent/UserMenuComponent";
import { useAuthentication, useTrip } from "../../hooks";
import { useState } from "react";
import UserManagment from "../UserManagment/UserManagment";

const UserMenu = () => {
  const { currentUser, SignOut } = useAuthentication();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <UserMenuComponent
        title={currentUser!.email!}
        handleSharedWith={handleClick}
        handleLogOut={SignOut}
      />
      {open ? <UserManagment open={open} setOpen={handleClick} /> : null}
    </>
  );
};

export default UserMenu;
