import { atom } from "recoil";

export let SurahAtom = atom({
  key: "surahAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
