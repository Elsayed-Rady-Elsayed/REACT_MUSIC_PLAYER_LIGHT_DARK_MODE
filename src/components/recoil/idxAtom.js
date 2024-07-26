import { atom } from "recoil";

export let idxAtom = atom({
  key: "idxAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
