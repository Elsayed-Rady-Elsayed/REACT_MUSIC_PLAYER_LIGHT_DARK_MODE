import { configureStore } from "@reduxjs/toolkit";
import quranSlice from "./getQuran";
const store = configureStore({
  reducer: {
    quran: quranSlice,
  },
});
export default store;
