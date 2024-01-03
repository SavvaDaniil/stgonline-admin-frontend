import { TeacherMicroViewModel } from "src/app/viewModel/teacher/TeacherMicroViewModel";


export type CourseEditDTO = {
    id: Number;
    meta_keywords: string | null;
    meta_description: string | null;
    name: string | null;
    active: number;
    price: number;
    price_fake: number;
    price_with_chat: number;
    price_with_chat_fake: number;
    days: number;
    description: string | null;
    status_of_chat_none_0_homework_1_and_chat_2: number;
    status_of_could_be_purchased_blank0_only_chat2_blank_or_chat3: number;

    order_in_list: number;
    poster_src: string | null;
    teaser_src: string | null;

    teacher_id: number;

    teacherMicroViewModels: Array<TeacherMicroViewModel>;
}