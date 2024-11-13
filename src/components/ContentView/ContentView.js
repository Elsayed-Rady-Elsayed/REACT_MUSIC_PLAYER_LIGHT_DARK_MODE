import React, { useState } from "react";
import "./ContentView.css";
import { useSelector } from "react-redux";
const ContentView = () => {
  const surah = useSelector((state) => state.quran.currentSurah);
  console.log(surah);
  const surahText = surah.ayahs?.map((el, idx) => {
    return (
      <span>
        {el.text}({idx + 1})
      </span>
    );
  });
  return (
    <div className="textConent">
      <h1>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</h1>
      <div>{surahText}</div>
    </div>
  );
};

export default ContentView;
