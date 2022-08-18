import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, map, tap } from "rxjs";
import { ArticleInterface } from "src/app/components/feed/types/articleInterface";
import { CreateArticleService } from "../../create-article.service";
import { createArticleAction,createArticleSuccessAction, createArticleFailureAction } from "../actions/createArticle.action";


@Injectable()
export class createArticleEffect {
    constructor(private actions$: Actions,
                private createArticleService: CreateArticleService,
                private router: Router) { }

    createArticle$ = createEffect(() => this.actions$.pipe(
        ofType(createArticleAction),
        switchMap(({ articleInput }) => {
            return this.createArticleService.createArticle(articleInput).pipe(
                map((article: ArticleInterface) => {
                    return createArticleSuccessAction({ article })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(createArticleFailureAction({errors: errorResponse.error}))
                })
            )})
    ))

    redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          const url = article.slug as string;
          this.router.navigate(['/articles', url])
        })
    ), {dispatch: false})
}

