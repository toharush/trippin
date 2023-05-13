import UserMenuComponent from "../../components/UserMenuComponent/UserMenuComponent";
import { useAuthentication, useTrip } from "../../hooks";
import { useState } from "react";
import UserManagment from "../UserManagment/UserManagment";

const UserMenu = () => {
  const { users } = useTrip();

  const { currentUser } = useAuthentication();
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <UserMenuComponent
        userNames={[currentUser!.email!, ...users.map((user) => user.email)]}
        handleClick={handleClick}
      />
      {open ? <UserManagment open={open} setOpen={handleClick} /> : null}
    </>
  );
};

export default UserMenu;
