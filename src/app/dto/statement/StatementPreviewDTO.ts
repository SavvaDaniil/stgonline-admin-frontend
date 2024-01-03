import { UserMicroViewModel } from "src/app/viewModel/user/UserMicroViewModel";

export type StatementPreviewDTO = {
    id: number;
    is_need_curator: number;
    is_payed: number;
    status: number;
    date_of_add: string | null;
    
    userMicroViewModel: UserMicroViewModel | null;
}