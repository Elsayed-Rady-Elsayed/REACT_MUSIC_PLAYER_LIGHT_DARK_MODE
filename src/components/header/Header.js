import React, { useState } from "react";
import "./header.css";
import { Toggle } from "../toggle/Toggle";
import SongsList from "../../listOfSongs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export const Header = () => {
  const showList = () => {
    console.log("ok");

    document.getElementById("parent").classList.toggle("show");
  };
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [headerState, setHeaderArabic] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lng == "ar") {
      setHeaderArabic(true);
    } else {
      setHeaderArabic(false);
    }
  };
  return (
    <div className={`header${headerState ? "-ar" : ""}`}>
      <div className="left">
        <h2>{t("headerTitle")}</h2>
      </div>
      <div className="right-controll">
        <span className="notify" onClick={showList}></span>
        <div className="dropdown">
          <button>
            <span>{t("langs")}</span>
            <ion-icon name="caret-down-outline"></ion-icon>
          </button>
          <div className="drop-down-content">
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("ar")}>العربيه</button>
          </div>
        </div>
        <Toggle />
      </div>
    </div>
  );
};
