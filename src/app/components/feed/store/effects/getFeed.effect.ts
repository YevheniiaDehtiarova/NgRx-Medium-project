import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { FeedService } from "../../feed.service";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import { getFeedAction, getFeedSuccessAction, getFeedFailureAction } from "../actions/getFeed.action";


@Injectable()
export class GetFeedEffect {
    constructor(private actions$: Actions,
        private feedService: FeedService) { }

    getFeed$ = createEffect(() => this.actions$.pipe(
        ofType(getFeedAction),
        switchMap(({url}) => {
    
            return this.feedService.getFeed(url).pipe(
                map((feed: GetFeedResponseInterface) => {
                    return getFeedSuccessAction({ feed })
                }),
                catchError(() => {
                    return of(getFeedFailureAction())
                })
            )
        })
    ))
}

