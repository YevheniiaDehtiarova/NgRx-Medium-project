import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { ArticleInterface } from "../../article/types/articleInterface";
import { AddToFavoriteService } from "../add-to-favorite.service";
import { AddToFavoriteAction, AddToFavoriteFailureAction, AddToFavoriteSuccessAction } from "./addToFavorite.action";


@Injectable()
export class AddToFavoriteEffect {
    constructor(private actions$: Actions,
        private addToFavoriteService: AddToFavoriteService) { }

    getFeed$ = createEffect(() => this.actions$.pipe(
        ofType(AddToFavoriteAction),
        switchMap(({isFavorited,slug}) => {
            const articles$ = isFavorited
            ? this.addToFavoriteService.removeFormFavorites(slug)
            : this.addToFavoriteService.addToFavorites(slug);
            return articles$.pipe(
                map((article: ArticleInterface) => {
                    return AddToFavoriteSuccessAction({ article })
                }),
                catchError(() => {
                    return of(AddToFavoriteFailureAction())
                })
            )
        })
    ))
}

