import React, { useEffect, useState } from "react";
import "./musicList.css";
import SongsList from "../../listOfSongs";
import { idxAtom } from "../recoil/idxAtom";
import { useRecoilState } from "recoil";
import { ClickedAtom } from "../recoil/clcikedAtom";
import { useTranslation } from "react-i18next";
import { SurahAtom } from "../recoil/surah";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuran, setCurrentSurah } from "../../store/getQuran";
export const MusicList = () => {
  const quran = useSelector((state) => state.quran);
  const { t, i18n } = useTranslation();
  const [changeLang, setChangeLang] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.language == "en") {
      setChangeLang(false);
    } else {
      setChangeLang(true);
    }
  }, [i18n.language]);
  // let showList = SongsList.map((el, idx) => {
  //   return (
  //     <li
  //       onClick={() => {
  //         setRecIdx(idx);
  //         setCurrentMusic({
  //           audio: el.audio,
  //           pic: el.pic,
  //           text: el.text,
  //           texten: el.texten,
  //           active: true,
  //         });
  //       }}
  //       key={idx}
  //       data-id={idx}
  //       className={`${changeLang ? "ar" : ""} item ${
  //         idx === recIdx ? "active" : "notactive"
  //       }`}
  //     >
  //       <img src={el.pic} alt="" className="img" />
  //       <div>
  //         <p className="sName">
  //           {t("textQuran", { returnObjects: true })[idx]}
  //         </p>

  //         <p className="artist">{t("qara")}</p>
  //       </div>
  //     </li>
  //   );
  // });
  const hideList = () => {
    document.getElementById("parent").classList.remove("show");
  };

  useEffect(() => {
    dispatch(fetchAllQuran());
  }, []);
  console.log(quran);

  const listOfSurah = quran.quran.data?.surahs?.map((el, idx) => (
    <li
      onClick={() => {
        dispatch(
          setCurrentSurah({
            current: {
              ...el,
              QuraName: quran.quran.data.edition.name,
              QuraNameEng: quran.quran.data.edition.englishName,
            },
          })
        );
      }}
      key={idx}
      data-id={idx}
      // className={`${changeLang ? "ar" : ""} item ${
      //   idx === recIdx ? "active" : "notactive"
      // }`}
    >
      <img src={el.pic} alt="" className="img" />
      <div>
        <p className="sName">
          {i18n.language === "en" ? el.englishName : el.name}
        </p>

        <p className="artist">
          {i18n.language === "en"
            ? quran.quran.data.edition.englishName
            : quran.quran.data.edition.name}
        </p>
      </div>
    </li>
  ));
  return (
    <div className="parent" id="parent">
      <div className="headerList">
        <button onClick={hideList}>x</button>
      </div>
      {/* <ul className="list">{showList}</ul> */}
      <ul className="list">{listOfSurah}</ul>
    </div>
  );
};
