import { TeacherMicroViewModel } from "src/app/viewModel/teacher/TeacherMicroViewModel";
import { UserMicroViewModel } from "src/app/viewModel/user/UserMicroViewModel";

export type StatementEditDTO = {
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

    teacherDesiredMicroViewModel: TeacherMicroViewModel | null;
    teacherMicroViewModel: TeacherMicroViewModel | null;

    is_payed: number;
    status: number;
    date_of_add: Date | null;
    date_of_active: Date | null;
}