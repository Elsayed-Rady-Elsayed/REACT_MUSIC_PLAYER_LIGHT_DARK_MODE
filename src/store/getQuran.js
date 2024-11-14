import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuran = createAsyncThunk(
  "fetchQuranSlice/getAllSurah",
  async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.alquran.cloud/v1/quran/ar.alafasy",
      });
      if (!response.data.code === 200) {
        throw new Error("error while fetching data");
      }

      return response.data;
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }
);

const QuranSlice = createSlice({
  name: "QuranSlice",
  initialState: {
    quran: {},
    loading: false,
    error: null,
    currentSurah: {
      QuraName: "مشاري العفاسي",
      QuraNameEng: "Alafasy",
      ayahs: [
        {
          number: 1,
          text: "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
        },
        {
          number: 2,
          text: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3",
        },
        {
          number: 3,
          text: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3",
        },
        {
          number: 4,
          text: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3",
        },
        {
          number: 5,
          text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3",
        },
        {
          number: 6,
          text: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3",
        },
        {
          number: 7,
          text: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
          audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
        },
      ],
      englishName: "Al-Faatiha",
      englishNameTranslation: "The Opening",
      name: "سُورَةُ ٱلْفَاتِحَةِ",
      number: 1,
      revelationType: "Meccan",
    },
  },
  reducers: {
    setCurrentSurah: (state, action) => {
      state.currentSurah = action.payload.current;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuran.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuran.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quran = action.payload;
      })
      .addCase(fetchAllQuran.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCurrentSurah } = QuranSlice.actions;
export default QuranSlice.reducer;
