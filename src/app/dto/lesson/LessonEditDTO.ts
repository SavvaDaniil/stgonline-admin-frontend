import { LessonTypeMicroViewModel } from "src/app/viewModel/lesson_type/LessonTypeMicroViewModel";
import { LevelMicroViewModel } from "src/app/viewModel/level/LevelMicroViewModel";
import { StyleMicroViewModel } from "src/app/viewModel/style/StyleMicroViewModel";
import { TeacherMicroViewModel } from "src/app/viewModel/teacher/TeacherMicroViewModel";


export type LessonEditDTO = {
    id: Number;
    meta_keywords: string | null;
    meta_description: string | null;
    name: string | null;
    short_name: string | null;
    music_name: string | null;
    poster_src: string | null;
    teaser_src: string | null;
    demo_src: string | null;
    active: Number;
    is_visible: boolean;

    days: Number;
    price: Number;

    video_hash_path: string | null;
    video_duration: Number;

    is_ai_available: boolean;

    level_id: Number;
    lesson_type_id: Number;
    teacher_id: Number;
    style_id: Number;

    levelMicroViewModels: Array<LevelMicroViewModel>;
    lessonTypeMicroViewModels: Array<LessonTypeMicroViewModel>;
    teacherMicroViewModels: Array<TeacherMicroViewModel>;
    styleMicroViewModels: Array<StyleMicroViewModel>;
}