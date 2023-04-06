import { ReactElement } from "react";
import "./SideBar.css";

interface props {
  ChildComponent?: ReactElement;
}

export default function SideBar({ ChildComponent }: props) {
  return <div className="main-sidebar">{ChildComponent}</div>;
}
