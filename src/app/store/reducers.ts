import { Action, createReducer, INIT, on } from "@ngrx/store";
import { registerAction, registerSuccessAction, registerFailureAction } from "./actions/register.action";
import { AuthStateInterface } from "../auth/types/authState.interface";
import { loginAction, loginSuccessAction, loginFailureAction, logoutAction } from "./actions/login.action";
import { getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction } from "./actions/getCurrentUser.action";
import {updateCurrentUserSuccessAction} from './actions/updateCurrentUser.action';


const initialstate: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null,
    isLoading: false
}

const authReducer = createReducer(
    initialstate,
    on(registerAction, (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null
    })
    ),
    on(registerSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
    })),
    on(registerFailureAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
    })),
    on(loginAction, (state): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null
    })),
    on(loginSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        isLoggedIn: true
    })),
    on(loginFailureAction, (state, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors
    })),
    on(getCurrentUserAction, (state): AuthStateInterface => ({
        ...state,
        isLoading: true
    })),
    on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.currentUser
    })),
    on(getCurrentUserFailureAction, (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null,
    })),
    on(updateCurrentUserSuccessAction, 
        (state, action): AuthStateInterface => ({
        ...state,
        currentUser: action.currentUser
    })),
    on(logoutAction, 
        (): AuthStateInterface => ({
          ...initialstate,
          isLoggedIn: false,
    }))
)


export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}