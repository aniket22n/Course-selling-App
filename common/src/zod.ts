import { z } from "zod";

export const SignupParams = z.object({
  username: z.string().min(1).max(15),
  email: z.string().email(),
  contactNumber: z.number().min(1),
  password: z.string().min(1).max(15),
});
export type SignupType = z.infer<typeof SignupParams>;

export const LoginParams = z.object({
  username: z.string().min(1).max(15),
  password: z.string().min(1).max(15),
});
export type LoginType = z.infer<typeof LoginParams>;

export const CourseParams = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  image: z.string().min(1),
  published: z.boolean(),
});
export type CourseType = z.infer<typeof CourseParams>;

export const PartialCourseParams = CourseParams.partial();
export type PartialCourseType = z.infer<typeof PartialCourseParams>;

//published this package to npm publically and can import this anywhere
