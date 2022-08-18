import {  createFeatureSelector, createSelector  } from "@ngrx/store";
import { EditArticleStateInterface } from "./types/editArticleStateInterface";

export const editArticleFeatureSelector = 
createFeatureSelector<EditArticleStateInterface>('editArticle');

export const editArticleSelector = 
createSelector(editArticleFeatureSelector,
(editArticleState: EditArticleStateInterface)=> editArticleState.article)

export const isSubmittingSelector = 
createSelector(editArticleFeatureSelector,
     (editArticleState: EditArticleStateInterface)=> editArticleState.isSubmitting)

export const validationErrorsSelector = createSelector(
    editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.validationErrors
)

export const isLoadinfSelector = createSelector(
    editArticleFeatureSelector,
    (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
)