import { createAction, props } from "@ngrx/store";
import { ArticleInterface } from "../../article/types/articleInterface";
import { ActionTypes } from "./actionType";

export const AddToFavoriteAction = createAction(
    ActionTypes.ADD_TO_FAVORITE,
    props<{isFavorited: boolean; slug: string}>()
)

export const AddToFavoriteSuccessAction = createAction(
    ActionTypes.ADD_TO_FAVORITE_SUCCESS,
    props<{article: ArticleInterface}>()
)

export const AddToFavoriteFailureAction = createAction(
    ActionTypes.ADD_TO_FAVORITE_FAILURE
)