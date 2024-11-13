import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import SongsList from "../../listOfSongs";
import { useRecoilState } from "recoil";
import { idxAtom } from "../recoil/idxAtom";
import { ClickedAtom } from "../recoil/clcikedAtom";
import { useTranslation } from "react-i18next";
import { SurahAtom } from "../recoil/surah";
import { useSelector } from "react-redux";

export const MusicPlayer = () => {
  const audioRef = useRef(null);
  const durationRef = useRef(null);
  const runningDurationRef = useRef(null);
  const intervalIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [idx, setIdx] = useState(0);
  const [clonedList, setClonedList] = useState(SongsList);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { t, i18n } = useTranslation();
  const surah = useSelector((state) => state.quran.currentSurah);
  const [LinksToSound, setSoundList] = useState([]);
  console.log(surah);
  useEffect(() => {
    surah.ayahs?.map((el, idx) => {
      setSoundList((prev) => [...prev, el.audio]);
    });
  }, []);
  // console.log(soundList);
  // const [currentTrack, setCurrentTrack] = useState(0);

  // useEffect(() => {
  //   // Set the audio source to the current track URL
  //   if (audioRef.current) {
  //     audioRef.current.src = soundList[currentTrack];
  //     audioRef.current.play();
  //   }
  // }, [currentTrack]);

  // const handleNextTrack = () => {
  //   setCurrentTrack((prevTrack) =>
  //     prevTrack < soundList.length - 1 ? prevTrack + 1 : 0
  //   );
  // };

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (audio) {
  //     audio.addEventListener("ended", handleNextTrack);
  //   }
  //   return () => {
  //     if (audio) {
  //       audio.removeEventListener("ended", handleNextTrack);
  //     }
  //   };
  // }, [audioRef]);

  // useEffect(() => {
  //   console.log(currentMusic);

  //   if (currentMusic.item.audio) {
  //     setClonedList(currentMusic);
  //     setIsPlaying(false);
  //   } else {
  //     setClonedList(SongsList);
  //     setIsPlaying(false);
  //   }
  // }, [currentMusic]);

  // useEffect(() => {
  //   const audio = audioRef.current;

  //   const updateProgress = () => {
  //     if (audio.duration) {
  //       const currentProgress = (audio.currentTime / audio.duration) * 100;
  //       setProgressWidth(currentProgress);
  //       setCurrentTime(audio.currentTime);
  //     }
  //   };

  //   audio.addEventListener("timeupdate", updateProgress);

  //   return () => {
  //     audio.removeEventListener("timeupdate", updateProgress);
  //   };
  // }, []);

  // const playAudio = () => {
  //   const audio = audioRef.current;
  //   const duration = audio.duration;

  //   if (!isPlaying) {
  //     setCurrentTime(0);
  //   }

  //   audio.play();
  //   intervalIdRef.current = setInterval(changeValue, 1000);

  //   const minutes = Math.floor(duration / 60);
  //   const seconds = Math.floor(duration % 60);
  //   durationRef.current.innerText = `${String(minutes).padStart(
  //     2,
  //     "0"
  //   )}:${String(seconds).padStart(2, "0")}`;

  //   setDuration(duration);
  //   setIsPlaying(true);
  // };

  // const pauseAudio = () => {
  //   clearInterval(intervalIdRef.current);
  //   audioRef.current.pause();
  //   setIsPlaying(false);
  // };

  // const handleVolumeChange = (event) => {
  //   const volume = event.target.value;
  //   audioRef.current.volume = volume;
  //   setVolume(volume);
  // };

  // const changeValue = () => {
  //   const currentTime = audioRef.current.currentTime;
  //   const duration = audioRef.current.duration;
  //   const minutes = Math.floor(currentTime / 60);
  //   const seconds = Math.floor(currentTime % 60);
  //   runningDurationRef.current.innerText = `${String(minutes).padStart(
  //     2,
  //     "0"
  //   )}:${String(seconds).padStart(2, "0")}`;
  // };

  // const handleProgressChange = (e) => {
  //   const audio = audioRef.current;
  //   const newProgress = e.target.value;
  //   const newTime = (newProgress / 100) * duration;
  //   audio.currentTime = newTime;
  //   setCurrentTime(newTime);
  //   setProgressWidth(newProgress);
  // };

  // const handlePrevious = () => {
  //   if (idx > 0) {
  //     setIdx(idx - 1);
  //     setRecIdx((rec) => rec - 1);
  //   }
  //   setCurrentMusic({});
  //   setIsPlaying(false);
  // };

  // const handleNext = () => {
  //   if (idx < SongsList.length - 1) {
  //     setIdx(idx + 1);
  //     setRecIdx((rec) => rec + 1);
  //   }
  //   setCurrentMusic({});
  //   setIsPlaying(false);
  // };

  return (
    <div className="audioCard">
      <div className="imgRotate">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElDvjUIbc_yHgaoNLAXGQMZhWhCUvvb3IgA&s"
          }
          alt="Album Art"
        />
        <div className="name">
          {clonedList.length
            ? i18n.language == "ar"
              ? surah?.name
              : surah?.englishName
            : i18n.language == "ar"
            ? surah?.name
            : surah?.englishName}
          <p>{i18n.language == "ar" ? surah?.QuraName : surah?.QuraNameEng}</p>
        </div>
      </div>
      <audio ref={audioRef} />

      <div className="controls">
        <div className="control">
          <ion-icon
            name="play-back-circle-outline"
            onClick={() => audioRef.current.play()}
          ></ion-icon>
          <button
          // onClick={
          //   isPlaying ? audioRef.current.pause() : audioRef.current.play()
          // }
          >
            {isPlaying && !audioRef.current.ended ? (
              <ion-icon name="pause-circle-outline"></ion-icon>
            ) : (
              <ion-icon name="play-circle-outline"></ion-icon>
            )}
          </button>
          <ion-icon
            name="play-forward-circle-outline"
            // onClick={handleNext}
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
              // onChange={handleProgressChange}
            />
          </div>
          <p ref={runningDurationRef}>00:00</p>
        </div>
      </div>

      {/* <input
        className="volumeRange"
        id="volumeRange"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      /> */}
    </div>
  );
};
