import axios from "axios";
import ContentView from "./components/ContentView/ContentView";
import { Header } from "./components/header/Header";
import { MusicList } from "./components/MusicList/MusicList";
import { MusicPlayer } from "./components/musicplayer/MusicPlayer";
import { useRecoilState } from "recoil";
import { idxAtom } from "./components/recoil/idxAtom";
import { SurahAtom } from "./components/recoil/surah";
import { useEffect, useState } from "react";
import { ClickedAtom } from "./components/recoil/clcikedAtom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuran } from "./store/getQuran";
import { useTranslation } from "react-i18next";

function App() {
  const { quran, loading, error } = useSelector((state) => state.quran);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuran());
  }, []);

  const { i18n } = useTranslation();
  const [content, setContent] = useState(<div className="loadingIcon"></div>);
  setTimeout(() => {
    setContent(
      <>
        <Header />
        <div className={`content ${i18n.language === "ar" ? "arc" : "enc"}`}>
          <MusicPlayer />
          <MusicList />
          <ContentView />
        </div>
      </>
    );
  }, 5000);
  return <div className="App">{content}</div>;
}

export default App;
