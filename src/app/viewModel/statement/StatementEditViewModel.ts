import { TeacherMicroViewModel } from "../teacher/TeacherMicroViewModel";
import { UserMicroViewModel } from "../user/UserMicroViewModel";

export type StatementEditViewModel = {
    id: number;
    userMicroViewModel: UserMicroViewModel | null;

    is_need_curator: number;

    experience: number;
    expectations: number;
    expected_time_for_lessons: number;

    idols: string | null;
    link1: string | null;
    link2: string | null;
    link3: string | null;

    //teacherDesiredMicroViewModel: TeacherMicroViewModel | null;
    teacher_desired_id: number;
    //teacherMicroViewModel: TeacherMicroViewModel | null;
    teacher_id: number;

    is_payed: number;
    status: number;
    date_of_add: string | null;
    date_of_active: string | null;
}