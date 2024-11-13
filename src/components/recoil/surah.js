import { atom } from "recoil";

export let SurahAtom = atom({
  key: "surahAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
