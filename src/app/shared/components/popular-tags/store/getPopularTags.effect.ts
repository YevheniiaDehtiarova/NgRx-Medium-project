import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { PopularTagsService } from "src/app/shared/services/popular-tags.service";
import { PopularTagType } from "src/app/shared/types/popularTag.type";
import { getPopularTagsAction, getPopularTagsFailureAction,getPopularTagsSuccessAction } from "./getPopularTags.action";

@Injectable()
export class GetPopularTagsEffect {
    constructor(private actions$: Actions,
        private popularTagsService: PopularTagsService) { }

    getPopularTags$ = createEffect(() => this.actions$.pipe(
        ofType(getPopularTagsAction),
        switchMap(() => {
            return this.popularTagsService.getPopularTags().pipe(
                map((popularTags: Array<PopularTagType>) => {
                    return getPopularTagsSuccessAction({ popularTags })
                }),
                catchError(() => {
                    return of(getPopularTagsFailureAction())
                })
            )
        })
    ))
}

