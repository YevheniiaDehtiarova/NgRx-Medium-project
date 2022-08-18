import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { ProfileInterface } from "../../article/types/profileInterface";
import { UserProfileService } from "../user-profile.service";
import { getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction } from "./getUserProfile.action";


@Injectable()
export class GetUserPrifileEffect {
    constructor(private actions$: Actions,
        private userProfileService: UserProfileService) { }

    getUserProfile$ = createEffect(() => this.actions$.pipe(
        ofType(getUserProfileAction),
        switchMap(({slug}) => {
            return this.userProfileService.getUserProfile(slug).pipe(
                map((userProfile: ProfileInterface) => {
                    return getUserProfileSuccessAction({ userProfile })
                }),
                catchError(() => {
                    return of(getUserProfileFailureAction())
                })
            )
        })
    ))
}

