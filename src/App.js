import axios from "axios";
import ContentView from "./components/ContentView/ContentView";
import { Header } from "./components/header/Header";
import { MusicList } from "./components/MusicList/MusicList";
import { MusicPlayer } from "./components/musicplayer/MusicPlayer";

function App() {
  axios({
    method: "get",
    url: "https://api.alquran.cloud/v1/quran/ar.alafasy",
    responseType: "stream",
  }).then((res) => {
    const data = JSON.parse(res.data);
    console.log(data.data.surahs[0].ayahs);
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
