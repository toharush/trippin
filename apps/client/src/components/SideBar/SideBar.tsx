import { ReactElement } from "react";
import "./SideBar.css";

interface props {
  children?: ReactElement;
}

export default function SideBar({ children }: props) {
  return <div className="main-sidebar">{children}</div>;
}
