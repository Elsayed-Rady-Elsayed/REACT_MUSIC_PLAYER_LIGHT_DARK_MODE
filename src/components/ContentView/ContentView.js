import React, { useState } from "react";
import "./ContentView.css";
import { useSelector } from "react-redux";
const ContentView = () => {
  // const surah = useSelector((state) => state.quran.currentSurah);
  const quran = useSelector((state) => state.quran.quran.data.surahs);
  const surahidx = useSelector((state) => state.quran.currentSurah);
  const surah = {
    ...quran[surahidx.idx],
  };

  const surahText = surah.ayahs?.map((el, idx) => {
    return (
      <>
        {el.text}({idx + 1})
      </>
    );
  });
  // console.log(surahText);

  const [fontSize, setFontSize] = useState();
  return (
    <div className="textConent">
      <input
        type="number"
        placeholder="Font Size"
        value={fontSize}
        min={"10"}
        max={"1000"}
        step={"2"}
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      />
      {/* <h1>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</h1> */}
      <div dir="rtl" lang="ar" style={{ fontSize: `${fontSize}px` }}>
        {surahText}
      </div>
    </div>
  );
};

export default ContentView;
