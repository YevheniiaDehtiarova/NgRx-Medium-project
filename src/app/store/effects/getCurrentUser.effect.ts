import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "../actions/getCurrentUser.action";


@Injectable()
export class GetCurrentUserEffect {
    constructor(private actions$: Actions,
        private authService: AuthService,
        private persistanceService: PersistanceService) { }

    getCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
            const token = this.persistanceService.get('accessToken');
            if (!token) {
                return of(getCurrentUserFailureAction())
            }
            return this.authService.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface) => {
                    return getCurrentUserSuccessAction({ currentUser })
                }),
                catchError(() => {
                    return of(getCurrentUserFailureAction())
                })
            )
        })
    ))
}

