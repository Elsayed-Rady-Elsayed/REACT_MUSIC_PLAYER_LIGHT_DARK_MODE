import React from "react";
import "./header.css";
import { Toggle } from "../toggle/Toggle";
import SongsList from "../../listOfSongs";
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
        <span className="notify">
          <span className="circle">{SongsList.length}</span>
          <ion-icon
            onClick={showList}
            name="list-circle-outline"
          ></ion-icon>{" "}
        </span>
        <Toggle />
      </div>
    </div>
  );
};
