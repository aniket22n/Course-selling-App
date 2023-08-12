import { atom } from "recoil";

// atoms/course.ts
export interface Course {
  title: string;
  description: string;
  price: number;
  image: string;
  published: boolean;
  _id: string;
}

// ... rest of the code ...

export const atomCourse = atom({
  key: "atomCourse",
  default: {
    isLoading: true,
    course: {
      title: "",
      description: "",
      price: 0,
      image: "",
      published: false,
      _id: "",
    },
  },
});
