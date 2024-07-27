import React, { useEffect, useRef } from "react";
import "./toggle.css";
export const Toggle = () => {
  const inref = useRef(null);
  // useEffect(() => {
  //   window.localStorage.getItem("mode") != null
  //     ? document
  //         .querySelector("body")
  //         .setAttribute("data-theme", window.localStorage.getItem("mode"))
  //     : document.querySelector("body").setAttribute("data-theme", "light");
  //   window.localStorage.getItem("mode") == "dark"
  //     ? document.querySelector("[type=checkbox]").setAttribute("checked", true)
  //     : document
  //         .querySelector("[type=checkbox]")
  //         .setAttribute("checked", false);
  // }, []);
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const ToggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
      window.localStorage.setItem("mode", "dark");
    } else {
      setLightMode();
      window.localStorage.setItem("mode", "light");
    }
  };
  return (
    <label className="switch">
      <input
        ref={inref}
        type="checkbox"
        onChange={(e) => {
          ToggleTheme(e);
        }}
      />
      <span className="slider"></span>
    </label>
  );
};
