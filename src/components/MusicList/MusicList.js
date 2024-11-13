import React, { useEffect, useState } from "react";
import "./musicList.css";
import SongsList from "../../listOfSongs";
import { idxAtom } from "../recoil/idxAtom";
import { useRecoilState } from "recoil";
import { ClickedAtom } from "../recoil/clcikedAtom";
import { useTranslation } from "react-i18next";
export const MusicList = () => {
  const [recIdx, setRecIdx] = useRecoilState(idxAtom);
  const [currentMusic, setCurrentMusic] = useRecoilState(ClickedAtom);
  const { t, i18n } = useTranslation();
  const [changeLang, setChangeLang] = useState();

  useEffect(() => {
    if (i18n.language == "en") {
      setChangeLang(false);
    } else {
      setChangeLang(true);
    }
  }, [i18n.language]);
  let showList = SongsList.map((el, idx) => {
    return (
      <li
        onClick={() => {
          setRecIdx(idx);
          setCurrentMusic({
            audio: el.audio,
            pic: el.pic,
            text: el.text,
            texten: el.texten,
            active: true,
          });
        }}
        key={idx}
        data-id={idx}
        className={`${changeLang ? "ar" : ""} item ${
          idx === recIdx ? "active" : "notactive"
        }`}
      >
        <img src={el.pic} alt="" className="img" />
        <div>
          <p className="sName">
            {t("textQuran", { returnObjects: true })[idx]}
          </p>

          <p className="artist">{t("qara")}</p>
        </div>
      </li>
    );
  });
  const hideList = () => {
    document.getElementById("parent").classList.remove("show");
  };
  return (
    <div className="parent" id="parent">
      <div className="headerList">
        <button onClick={hideList}>x</button>
      </div>
      <ul className="list">{showList}</ul>
    </div>
  );
};
