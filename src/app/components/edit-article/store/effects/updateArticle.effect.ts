import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { ArticleInterface } from "src/app/components/feed/types/articleInterface";
import { EditArticleService } from "../../edit-article.service";
import { updateArticleSuccessAction, updateArticleAction, updateArticleFailureAction } from "../actions/updateArticle.action";


@Injectable()
export class UpdateArticleEffect {
    constructor(private actions$: Actions,
                private editArticleService: EditArticleService,
                private router: Router) { }

    updateArticle$ = createEffect(() => this.actions$.pipe(
        ofType(updateArticleAction),
        switchMap(({ articleInput, slug }) => {
            return this.editArticleService.updateArticle(slug,articleInput).pipe(
                map((article: ArticleInterface) => {
                    return updateArticleSuccessAction({ article })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(updateArticleFailureAction({errors: errorResponse.error}))
                })
            )})
    ))

    redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({article}) => {
          const url = article.slug as string;
          this.router.navigate(['/articles', url])
        })
    ), {dispatch: false})
}

