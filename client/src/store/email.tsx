import { atom } from "recoil";

export const atomUser = atom({
  key: "atomUser",
  default: "",
});

export const atomAdmin = atom({
  key: "atomAdmin",
  default: "",
});
