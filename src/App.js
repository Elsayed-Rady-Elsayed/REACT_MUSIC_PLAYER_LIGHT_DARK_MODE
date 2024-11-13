import axios from "axios";
import ContentView from "./components/ContentView/ContentView";
import { Header } from "./components/header/Header";
import { MusicList } from "./components/MusicList/MusicList";
import { MusicPlayer } from "./components/musicplayer/MusicPlayer";
import { useRecoilState } from "recoil";
import { idxAtom } from "./components/recoil/idxAtom";
import { SurahAtom } from "./components/recoil/surah";

function App() {
  const [recIdx, setRecIdx] = useRecoilState(SurahAtom);

  axios({
    method: "get",
    url: "https://api.alquran.cloud/v1/quran/ar.alafasy",
    responseType: "stream",
  }).then((res) => {
    const data = JSON.parse(res.data);
    // console.log(data.data.surahs);
    setRecIdx(data.data.surahs);
  });
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
