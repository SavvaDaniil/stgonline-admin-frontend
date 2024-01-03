import { CourseLessonInfoViewModel } from "./CourseLessonInfoViewModel";

export type CourseDayInfoViewModel = {
    id: number;
    name: string | null;
    courseLessonInfoViewModels: Array<CourseLessonInfoViewModel>;
}