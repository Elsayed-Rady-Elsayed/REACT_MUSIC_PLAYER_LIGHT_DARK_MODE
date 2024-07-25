import React from "react";
import "./toggle.css";
export const Toggle = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const ToggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };
  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={(e) => {
          ToggleTheme(e);
        }}
      />
      <span className="slider"></span>
    </label>
  );
};
