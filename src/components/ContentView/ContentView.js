import React, { useState } from "react";
import "./ContentView.css";
import SongsList from "../../listOfSongs";
import { useRecoilState } from "recoil";
import { idxAtom } from "../recoil/idxAtom";
import { ClickedAtom } from "../recoil/clcikedAtom";
const ContentView = () => {
  const [clonedList, setClonedList] = useState(SongsList);
  const [recIdx, setRecIdx] = useRecoilState(idxAtom);
  const [currentMusic, setCurrentMusic] = useRecoilState(ClickedAtom);
  const surah = currentMusic.item?.ayahs.map((el, idx) => {
    return (
      <span>
        {el.text}({idx + 1})
      </span>
    );
  });
  return (
    <div className="textConent">
      <h1>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</h1>
      {/* {clonedList[recIdx].quran} */}
      <div>{surah}</div>
    </div>
  );
};

export default ContentView;
