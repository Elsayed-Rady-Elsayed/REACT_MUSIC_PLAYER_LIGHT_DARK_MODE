import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSurah } from "../../store/getQuran";

export const MusicPlayer = () => {
  const { i18n } = useTranslation();
  const quran = useSelector((state) => state.quran.quran.data.surahs);
  const surahidx = useSelector((state) => state.quran.currentSurah);
  const surah = {
    ...quran[surahidx.idx],
    qaraName: surahidx.QuraName,
    NameEng: surahidx.QuraNameEng,
  };
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const ayahs = surah.ayahs;
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentAyahIndex(0);
  }, [surahidx]);

  const handleAudioEnd = () => {
    if (currentAyahIndex < ayahs.length - 1) {
      setCurrentAyahIndex(currentAyahIndex + 1);
    } else {
      setIsPlaying(false);
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
          {surah?.name}-{surah?.englishName}
          <p className="qaraName">
            {surah.qaraName} ({surah?.NameEng})
          </p>
        </div>
      </div>
      <audio
        onEnded={handleAudioEnd}
        ref={audioRef}
        src={ayahs[currentAyahIndex]?.audio}
      />

      <div className="controls">
        <div className="control">
          <ion-icon
            name="play-back-circle-outline"
            onClick={() => {
              if (surahidx.idx > 0) {
                dispatch(
                  setCurrentSurah({
                    current: {
                      idx: surahidx.idx - 1,
                      ...quran[surahidx.idx - 1],
                      QuraName: surah.name,
                      QuraNameEng: surah?.NameEng,
                    },
                  })
                );
                setIsPlaying(false);
              }
            }}
          ></ion-icon>
          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <ion-icon name="pause-circle-outline"></ion-icon>
            ) : (
              <ion-icon name="play-circle-outline"></ion-icon>
            )}
          </button>
          <ion-icon
            name="play-forward-circle-outline"
            onClick={() => {
              dispatch(
                setCurrentSurah({
                  current: {
                    idx: surahidx.idx + 1,
                    ...quran[surahidx.idx + 1],
                    QuraName: surah.name,
                    QuraNameEng: surah?.NameEng,
                  },
                })
              );
              setIsPlaying(false);
            }}
          ></ion-icon>
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
    </div>
  );
};
