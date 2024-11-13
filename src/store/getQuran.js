import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuran = createAsyncThunk(
  "fetchQuranSlice/getAllSurah",
  async () => {
    try {
      console.log("fdsa");

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
    currentSurah: {},
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
