import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { ArticleService as SharedArticleService} from "src/app/shared/services/article.service";
import { getArticleAction,getArticleSuccessAction, getArticleFailureAction } from "../actions/getArticle.action";


@Injectable()
export class GetArticleEffect {
    constructor(private actions$: Actions,
        private articleService: SharedArticleService) { }

    getFeed$ = createEffect(() => this.actions$.pipe(
        ofType(getArticleAction),
        switchMap(({slug}) => {
            return this.articleService.getArticle(slug).pipe(
                map((article: any) => {
                    return getArticleSuccessAction({ article })
                }),
                catchError(() => {
                    return of(getArticleFailureAction())
                })
            )
        })
    ))
}

