import { z } from "zod";
export declare const SignupParams: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    contactNumber: z.ZodNumber;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    contactNumber: number;
    password: string;
}, {
    username: string;
    email: string;
    contactNumber: number;
    password: string;
}>;
export type SignupType = z.infer<typeof SignupParams>;
export declare const LoginParams: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type LoginType = z.infer<typeof LoginParams>;
export declare const CourseParams: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    image: z.ZodString;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number;
    image: string;
    published: boolean;
}, {
    title: string;
    description: string;
    price: number;
    image: string;
    published: boolean;
}>;
export type CourseType = z.infer<typeof CourseParams>;
export declare const PartialCourseParams: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    image?: string | undefined;
    published?: boolean | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    image?: string | undefined;
    published?: boolean | undefined;
}>;
export type PartialCourseType = z.infer<typeof PartialCourseParams>;
