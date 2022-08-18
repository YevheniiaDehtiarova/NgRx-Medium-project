import { ArticleInterface } from "src/app/components/feed/types/articleInterface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

export interface EditArticleStateInterface {
    isLoading: boolean;
    article: ArticleInterface | null;
    isSubmitting: boolean;
    validationErrors: BackendErrorsInterface | null
}