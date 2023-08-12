import { atom } from "recoil";

export interface User {
  username: string;
  email: string;
  contactNumber: number;
  password: string;
}

export const atomUser = atom({
  key: "atomUser",
  default: {
    isLoading: true,
    user: {
      username: "",
      email: "",
      contactNumber: 0,
      password: "",
    },
  },
});
