import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { CurrentUserInterface  } from "src/app/shared/types/currentUser.interface";
import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register.action";

@Injectable()
export class RegisterEffect {
    constructor(private actions$: Actions,
                private authService: AuthService,
                private persistanceService: PersistanceService,
                private router: Router) { }

    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        switchMap(({ request }) => {
            return this.authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    this.persistanceService.set('accessToken', currentUser.token)
                    return registerSuccessAction({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(registerFailureAction({errors: errorResponse.error}))
                })
            )})
    ))

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
    ), {dispatch: false})
}

