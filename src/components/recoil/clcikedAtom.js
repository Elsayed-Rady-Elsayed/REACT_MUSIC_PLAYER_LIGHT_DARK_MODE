import { atom } from "recoil";

export let ClickedAtom = atom({
  key: "ClickedAtom", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
