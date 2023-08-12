import { selector } from "recoil";
import { atomUser } from "../atoms/user";

export const isUserLoading = selector({
  key: "isUserLoading",
  get: ({ get }) => {
    const state = get(atomUser);
    return state.isLoading;
  },
});

export const userUsername = selector({
  key: "userUsername",
  get: ({ get }) => {
    const state = get(atomUser);
    return state.user.username;
  },
});

export const userEmail = selector({
  key: "userEmail",
  get: ({ get }) => {
    const state = get(atomUser);
    return state.user.email;
  },
});

export const userContactNumber = selector({
  key: "userContactNumber",
  get: ({ get }) => {
    const state = get(atomUser);
    return state.user.contactNumber;
  },
});

export const userPassword = selector({
  key: "userPassword",
  get: ({ get }) => {
    const state = get(atomUser);
    return state.user.password;
  },
});
