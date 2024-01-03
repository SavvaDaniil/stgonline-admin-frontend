import { UserMicroViewModel } from "../user/UserMicroViewModel";

export type StatementPreviewViewModel = {
    id: number;
    is_need_curator: number;
    is_payed: number;
    status: number;
    date_of_add: string | null;
    
    userMicroViewModel: UserMicroViewModel | null;
}