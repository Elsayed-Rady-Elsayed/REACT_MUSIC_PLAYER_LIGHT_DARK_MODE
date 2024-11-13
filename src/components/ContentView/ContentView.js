import React, { useState } from "react";
import "./ContentView.css";
import SongsList from "../../listOfSongs";
import { useRecoilState } from "recoil";
import { idxAtom } from "../recoil/idxAtom";
const ContentView = () => {
  const [clonedList, setClonedList] = useState(SongsList);
  const [recIdx, setRecIdx] = useRecoilState(idxAtom);

  return (
    <div className="textConent">
      <h1>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</h1>
      {clonedList[recIdx].quran}
    </div>
  );
};

export default ContentView;
