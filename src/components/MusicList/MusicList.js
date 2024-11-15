import React, { useEffect, useState } from "react";
import "./musicList.css";
import { useTranslation } from "react-i18next";
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
  const hideList = () => {
    document.getElementById("parent").classList.remove("show");
  };

  // useEffect(() => {
  //   dispatch(fetchAllQuran());
  // }, []);

  const listOfSurah = quran.quran.data.surahs?.map((el, idx) => (
    <li
      onClick={() => {
        dispatch(
          setCurrentSurah({
            current: {
              idx: idx,
              ...el,
              QuraName: quran.quran.data.edition.name,
              QuraNameEng: quran.quran.data.edition.englishName,
            },
          })
        );
      }}
      key={idx}
      data-id={idx}
      className={`${i18n.language === "ar" ? "arl" : "enl"}`}
      // className={`${changeLang ? "ar" : ""} item ${
      //   idx === recIdx ? "active" : "notactive"
      // }`}
    >
      <img src={el.pic} alt="" className="img" />
      <div>
        <p className={`sName ${i18n.language === "ar" ? "right" : "left"}`}>
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
      <ul className="list">{listOfSurah}</ul>
    </div>
  );
};
