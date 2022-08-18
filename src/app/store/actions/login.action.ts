import { createAction,props } from "@ngrx/store";
import { LoginRequestInterface } from "src/app/auth/types/loginRequest.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { ActionTypes } from "./actionTypes";

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{errors: BackendErrorsInterface}>()
)

export const logoutAction = createAction(ActionTypes.LOGOUT)