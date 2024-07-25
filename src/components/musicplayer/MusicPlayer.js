import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import alliask from "../../assets/alliask.mp3";
import adele1 from "../../assets/images/adele1.jpeg";

export const MusicPlayer = () => {
  const audioRef = useRef(null);
  const durationRef = useRef(null);
  const runningDurationRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progressWidth, setprogressWidth] = useState(0);

  const playAudio = () => {
    const duration = audioRef.current.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    durationRef.current.innerText = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
    audioRef.current.play();
    intervalIdRef.current = setInterval(changeValue, 1000);
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    clearInterval(intervalIdRef.current);
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    audioRef.current.volume = volume;
    setVolume(volume);
  };

  const changeValue = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    runningDurationRef.current.innerText = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
    setprogressWidth((currentTime / duration) * 100);
  };
  const SetDuration = () => {
    return audioRef.current.duration ? audioRef.current.duration : 0;
  };
  return (
    <div className="audioCard">
      <div className="imgRotate">
        <img src={adele1} alt="Adele" />
      </div>
      <audio ref={audioRef} src={alliask} />
      <div className="name">ADELE - ALL I ASK</div>
      <div className="controls">
        <ion-icon name="play-back-circle-outline"></ion-icon>
        <button onClick={isPlaying ? pauseAudio : playAudio}>
          {isPlaying && !audioRef.current.ended ? (
            <ion-icon name="pause-circle-outline"></ion-icon>
          ) : (
            <ion-icon name="play-circle-outline"></ion-icon>
          )}
        </button>
        <ion-icon name="play-forward-circle-outline"></ion-icon>
      </div>
      <div className="progreesData">
        <p ref={durationRef}>00:00</p>
        <div className="prog">
          {/* <div
            className="val"
            style={{
              width: `${progressWidth}%`,
            }}
          ></div> */}
          <input
            id="progress"
            type="range"
            min="0"
            max={SetDuration}
            step="1.9"
            value={isPlaying ? audioRef.current.currentTime : 0}
            // onChange={handleVolumeChange}
          />
        </div>
        <p ref={runningDurationRef}>00:00</p>
      </div>
      <input
        className="volumeRange"
        id="volumeRange"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};
