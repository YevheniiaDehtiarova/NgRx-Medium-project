import {  createFeatureSelector, createSelector  } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.interface";

export const ArticleFeatureSelector = 
createFeatureSelector<ArticleStateInterface>('article');

export const isLoadingSelector = 
createSelector(ArticleFeatureSelector,
(articleState: ArticleStateInterface)=> articleState.isLoading)

export const errorSelector = 
createSelector(ArticleFeatureSelector,
(articleState: ArticleStateInterface)=> articleState.error)

export const articleSelector = 
createSelector(ArticleFeatureSelector,
(articleState: ArticleStateInterface)=> articleState.data)

export const isSubmittingSelector = 
createSelector(ArticleFeatureSelector,
     (articleState: ArticleStateInterface)=> articleState.isSubmitting)