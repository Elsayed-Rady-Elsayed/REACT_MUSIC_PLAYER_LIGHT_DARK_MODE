import React from "react";
import "./header.css";
import { Toggle } from "../toggle/Toggle";
export const Header = () => {
  const showList = () => {
    document.getElementById("parent").classList.toggle("show");
  };
  return (
    <div className="header">
      <div className="left">
        <h2>Quran</h2>
      </div>
      <div className="right-controll">
        <ion-icon onClick={showList} name="list-circle-outline"></ion-icon>{" "}
        <span className="notify">
          <span className="circle">2</span>
          <ion-icon name="notifications-outline"></ion-icon>
        </span>
        <Toggle />
      </div>
    </div>
  );
};
