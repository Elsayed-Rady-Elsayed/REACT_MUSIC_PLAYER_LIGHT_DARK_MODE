import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import alliask from "../../assets/alliask.mp3";
import adele1 from "../../assets/images/adele1.jpeg";
import SongsList from "../../listOfSongs";
import { useRecoilState } from "recoil";
import { idxAtom } from "../recoil/idxAtom";
import { ClickedAtom } from "../recoil/clcikedAtom";
console.log(SongsList);
export const MusicPlayer = () => {
  const audioRef = useRef(null);
  const durationRef = useRef(null);
  const runningDurationRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progressWidth, setprogressWidth] = useState(0);
  const [idx, setIdx] = useState(0);
  const [recIdx, setRecIdx] = useRecoilState(idxAtom);
  const [currentMusic, setCurrentMusic] = useRecoilState(ClickedAtom);
  const [clonedList, setClonedList] = useState(...SongsList);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    console.log(currentMusic);
    if (currentMusic.audio != null) {
      setClonedList(currentMusic);
      setIsPlaying(false);
    } else {
      setClonedList(SongsList);
      setIsPlaying(false);
    }
  }, [currentMusic]);

  const playAudio = () => {
    if (!isPlaying) {
      setCurrentTime(0);
    }
    const duration = audioRef.current.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    durationRef.current.innerText = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
    audioRef.current.play();
    intervalIdRef.current = setInterval(changeValue, 1000);
    setDuration(duration);
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
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return (
    <div className="audioCard">
      <div className="imgRotate">
        <img
          src={clonedList.length > 1 ? clonedList[idx].pic : clonedList.pic}
          alt="Adele"
        />
      </div>
      <audio
        ref={audioRef}
        src={clonedList.length > 1 ? clonedList[idx].audio : clonedList.audio}
      />
      <div className="name">
        {clonedList.length > 1 ? clonedList[idx].text : clonedList.text}
      </div>
      <div className="controls">
        <ion-icon
          name="play-back-circle-outline"
          onClick={() => {
            if (idx > 0) {
              setIdx(idx - 1);
              setRecIdx((rec) => rec - 1);
            }
            setCurrentMusic({});
            setIsPlaying(false);
          }}
        ></ion-icon>
        <button onClick={isPlaying ? pauseAudio : playAudio}>
          {isPlaying && !audioRef.current.ended ? (
            <ion-icon name="pause-circle-outline"></ion-icon>
          ) : (
            <ion-icon name="play-circle-outline"></ion-icon>
          )}
        </button>
        <ion-icon
          name="play-forward-circle-outline"
          onClick={() => {
            if (idx < SongsList.length - 1) {
              setIdx(idx + 1);
              setRecIdx((rec) => rec + 1);
            }
            setCurrentMusic({});
            setIsPlaying(false);
          }}
        ></ion-icon>
      </div>
      <div className="progreesData">
        <p ref={durationRef}>00:00</p>
        <div className="prog">
          <input
            id="progress"
            type="range"
            min="0"
            max={SetDuration}
            step="1.9"
            value={isPlaying ? (currentTime / duration) * 100 : 0}
            onChange={handleProgressChange}
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
