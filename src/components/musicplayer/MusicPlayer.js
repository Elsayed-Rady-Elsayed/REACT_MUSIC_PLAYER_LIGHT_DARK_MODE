import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import SongsList from "../../listOfSongs";
import { useRecoilState } from "recoil";
import { idxAtom } from "../recoil/idxAtom";
import { ClickedAtom } from "../recoil/clcikedAtom";
import { useTranslation } from "react-i18next";
import { SurahAtom } from "../recoil/surah";

export const MusicPlayer = () => {
  const audioRef = useRef(null);
  const durationRef = useRef(null);
  const runningDurationRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [idx, setIdx] = useState(0);
  const [recIdx, setRecIdx] = useRecoilState(idxAtom);
  const [currentMusic, setCurrentMusic] = useRecoilState(ClickedAtom);
  const [clonedList, setClonedList] = useState(SongsList);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (currentMusic.audio) {
      setClonedList(currentMusic);
      setIsPlaying(false);
    } else {
      setClonedList(SongsList);
      setIsPlaying(false);
    }
  }, [currentMusic]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgressWidth(currentProgress);
        setCurrentTime(audio.currentTime);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const playAudio = () => {
    const audio = audioRef.current;
    const duration = audio.duration;

    if (!isPlaying) {
      setCurrentTime(0);
    }

    audio.play();
    intervalIdRef.current = setInterval(changeValue, 1000);

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    durationRef.current.innerText = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;

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
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newProgress = e.target.value;
    const newTime = (newProgress / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgressWidth(newProgress);
  };

  const handlePrevious = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      setRecIdx((rec) => rec - 1);
    }
    setCurrentMusic({});
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (idx < SongsList.length - 1) {
      setIdx(idx + 1);
      setRecIdx((rec) => rec + 1);
    }
    setCurrentMusic({});
    setIsPlaying(false);
  };

  return (
    <div className="audioCard">
      <div className="imgRotate">
        {/* <div className="smImg">
          <img
            src={clonedList.length > 1 ? clonedList[idx].pic : clonedList.pic}
            alt="Album Art"
          />
        </div> */}
        <img
          src={clonedList.length > 1 ? clonedList[idx].pic : clonedList.pic}
          alt="Album Art"
        />
        <div className="name">
          {clonedList.length > 1
            ? i18n.language == "ar"
              ? clonedList[idx].text
              : clonedList[idx].texten
            : i18n.language == "ar"
            ? clonedList.text
            : clonedList.texten}
          <p>{t("qara")}</p>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={clonedList.length > 1 ? clonedList[idx].audio : clonedList.audio}
      />

      <div className="controls">
        <div className="control">
          <ion-icon
            name="play-back-circle-outline"
            onClick={handlePrevious}
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
            onClick={handleNext}
          ></ion-icon>
        </div>
        <div className="progressData">
          <p ref={durationRef}>00:00</p>
          <div className="prog">
            <input
              id="progress"
              type="range"
              min="0"
              max="100"
              step="1"
              value={progressWidth}
              onChange={handleProgressChange}
            />
          </div>
          <p ref={runningDurationRef}>00:00</p>
        </div>
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
