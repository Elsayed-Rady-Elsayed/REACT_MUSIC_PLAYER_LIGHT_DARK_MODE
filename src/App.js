import axios from "axios";
import ContentView from "./components/ContentView/ContentView";
import { Header } from "./components/header/Header";
import { MusicList } from "./components/MusicList/MusicList";
import { MusicPlayer } from "./components/musicplayer/MusicPlayer";
import { useRecoilState } from "recoil";
import { idxAtom } from "./components/recoil/idxAtom";
import { SurahAtom } from "./components/recoil/surah";
import { useEffect } from "react";
import { ClickedAtom } from "./components/recoil/clcikedAtom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuran } from "./store/getQuran";

function App() {
  const quran = useSelector((state) => state.quran);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuran());
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="content">
        <MusicPlayer />
        <MusicList />
        <ContentView />
      </div>
    </div>
  );
}

export default App;
