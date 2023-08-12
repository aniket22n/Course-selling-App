import { selector } from "recoil";
import { atomCourse } from "../atoms/course"; // Update the path if needed

export const isCourseLoading = selector({
  key: "isCourseLoading",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.isLoading;
  },
});

export const courseTitle = selector({
  key: "courseTitle",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.course.title;
  },
});

export const courseDescription = selector({
  key: "courseDescription",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.course.description;
  },
});

export const coursePrice = selector({
  key: "coursePrice",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.course.price;
  },
});

export const courseImage = selector({
  key: "courseImage",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.course.image;
  },
});

export const coursePublished = selector({
  key: "coursePublished",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.course.published;
  },
});

export const courseId = selector({
  key: "courseId",
  get: ({ get }) => {
    const state = get(atomCourse);
    return state.course._id;
  },
});
