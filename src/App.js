import ContentView from "./components/ContentView/ContentView";
import { Header } from "./components/header/Header";
import { MusicList } from "./components/MusicList/MusicList";
import { MusicPlayer } from "./components/musicplayer/MusicPlayer";

function App() {
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
