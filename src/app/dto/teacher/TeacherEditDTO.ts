

export type TeacherEditDTO = {
    id: Number;
    name: string | null;
    poster_src: string | null;
    email: string | null;
    telegram: string | null;
    instagram: string | null;
    is_active: boolean;
    is_curator: boolean;
    price_tariff_1: Number;
    price_tariff_2: Number;
    price_tariff_3: Number;
    description: string | null;
    short_description: string | null;
    mentor_bio: string | null;
    mentor_awards: string | null;
}