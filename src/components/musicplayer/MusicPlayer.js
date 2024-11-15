import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const MusicPlayer = () => {
  const { i18n } = useTranslation();
  const surah = useSelector((state) => state.quran.currentSurah);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const ayahs = surah.ayahs;

  useEffect(() => {
    setCurrentAyahIndex(0);
  }, [surah]);

  const handleAudioEnd = () => {
    if (currentAyahIndex < ayahs.length - 1) {
      setCurrentAyahIndex(currentAyahIndex + 1);
    } else {
      setIsPlaying(false); // Stop playing at the end of the surah
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentAyahIndex, isPlaying, volume]);

  console.log(surah);

  return (
    <div className={`audioCard ${i18n.language === "en" ? "ena" : "ara"}`}>
      <div className={`imgRotate ${i18n.language === "en" ? "enn" : "arn"}`}>
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElDvjUIbc_yHgaoNLAXGQMZhWhCUvvb3IgA&s"
          }
          alt="Album Art"
        />
        <div className="name">
          {surah.name}-{surah.englishName}
          <p className="qaraName">
            {surah.QuraName} ({surah.QuraNameEng})
          </p>
        </div>
      </div>
      <audio
        onEnded={handleAudioEnd}
        ref={audioRef}
        src={ayahs[currentAyahIndex].audio}
      />

      <div className="controls">
        <div className="control">
          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <ion-icon name="pause-circle-outline"></ion-icon>
            ) : (
              <ion-icon name="play-circle-outline"></ion-icon>
            )}
          </button>
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
        onChange={(e) => {
          setVolume(e.target.value);
        }}
      />
    </div>
  );
};
