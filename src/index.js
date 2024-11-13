import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import SongsList from "./listOfSongs";
const root = ReactDOM.createRoot(document.getElementById("root"));
let s = SongsList.map((el) => el.texten);
i18n.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: {
        headerTitle: "Quran",
        langs: "language",
        textQuran: SongsList.map((el) => el.texten),
        qara: "Elmenshawy",
      },
    },
    ar: {
      translation: {
        headerTitle: "القران الكريم",
        langs: "اللغات",
        textQuran: SongsList.map((el) => el.text),
        qara: "المنشاوي",
      },
    },
  },
});
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
