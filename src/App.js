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

function App() {
  const [recIdx, setRecIdx] = useRecoilState(SurahAtom);
  const [currentMusic, setCurrentMusic] = useRecoilState(ClickedAtom);

  const fetchData = async () => {
    await axios({
      method: "get",
      url: "https://api.alquran.cloud/v1/quran/ar.alafasy",
    })
      .then((res) => {
        console.log(res.data);
        setCurrentMusic({
          item: res.data.data.surahs[0],
          edition: res.data.data.edition,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
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
