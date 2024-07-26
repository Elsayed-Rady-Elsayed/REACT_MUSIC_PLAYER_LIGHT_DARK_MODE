import React from "react";
import "./musicList.css";
import SongsList from "../../listOfSongs";
import { idxAtom } from "../recoil/idxAtom";
import { useRecoilState } from "recoil";
import { ClickedAtom } from "../recoil/clcikedAtom";
export const MusicList = () => {
  const [recIdx, setRecIdx] = useRecoilState(idxAtom);
  const [currentMusic, setCurrentMusic] = useRecoilState(ClickedAtom);

  let showList = SongsList.map((el, idx) => {
    return (
      <li
        onClick={() => {
          setCurrentMusic({
            audio: el.audio,
            pic: el.pic,
            text: el.text,
            active: true,
          });
        }}
        key={idx}
        data-id={idx}
        className={`item ${idx === recIdx ? "active" : "notactive"}`}
      >
        <img src={el.pic} alt="" className="img" />
        <div>
          <p className="sName">{el.text}</p>
          <p className="artist">adele</p>
        </div>
      </li>
    );
  });
  return (
    <div className="parent">
      <ul className="list">{showList}</ul>
    </div>
  );
};
