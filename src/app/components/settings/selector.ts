import {  createFeatureSelector, createSelector  } from "@ngrx/store";
import { SettingsStateInterface } from "./types/settingsState.interface";


export const settingsFeatureSelector = createFeatureSelector<SettingsStateInterface>('auth');

export const isSubmittingSelector = createSelector(settingsFeatureSelector, (authState: SettingsStateInterface)=> authState.isSubmitting)

export const validationErrorsSelector = createSelector(
    settingsFeatureSelector,
    (authState: SettingsStateInterface) => authState.validationErrors
)