import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { logoutAction } from "../actions/login.action";

@Injectable()
export class LogoutEffect {
    constructor(private actions$: Actions, 
                private persistenceService: PersistanceService,
                private router: Router) { }
    logout$ = createEffect(
        () => this.actions$.pipe(
            ofType(logoutAction),
            tap(() => { 
                this.persistenceService.set('accesToken', '')
                this.router.navigateByUrl('/')
            })
        ),
        { dispatch: false }
    )
}