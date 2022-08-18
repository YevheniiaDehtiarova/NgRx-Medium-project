import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { ArticleService } from "../../article.service";
import { deleteArticleAction, deleteArticleSuccessAction, deleteArticleFailureAction } from "../actions/deleteArticle.action";

@Injectable()
export class DeleteArticleEffect {
    constructor(private actions$: Actions,
        private articleService: ArticleService,
        private router: Router) { }

    deleteFeed$ = createEffect(() => this.actions$.pipe(
        ofType(deleteArticleAction),
        switchMap(({ slug }) => {
            return this.articleService.delete(slug).pipe(
                map(() => {
                    return deleteArticleSuccessAction()
                }),
                catchError(() => {
                    return of(deleteArticleFailureAction())
                })
            )
        })
    ))
    redirectAfterDelete$ = createEffect(
        () => this.actions$.pipe(
            ofType(deleteArticleSuccessAction),
            tap(() => {
                this.router.navigate(['/'])
            })
        ), {dispatch: false}
    )
}


