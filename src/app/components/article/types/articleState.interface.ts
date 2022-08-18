import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { ArticleInterface } from "./articleInterface";

export interface ArticleStateInterface {
    isLoading: boolean;
    error: string| null;
    data: ArticleInterface | null;
    isSubmitting: boolean;
}