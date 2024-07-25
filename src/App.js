import { Header } from "./components/header/Header";
import { MusicPlayer } from "./components/musicplayer/MusicPlayer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
