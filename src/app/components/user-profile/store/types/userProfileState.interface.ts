import { ProfileInterface } from "src/app/components/article/types/profileInterface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

export interface UserProfileStateInterface{
    isLoading: boolean;
    data: ProfileInterface | null;
    error: string | null;
}