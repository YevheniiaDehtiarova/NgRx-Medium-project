import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ArticleInterface } from '../article/types/articleInterface';
import { updateArticleAction } from './store/actions/updateArticle.action';
import { editArticleSelector, isSubmittingSelector, validationErrorsSelector} from '../edit-article/store/selector'
import { getArticleAction } from './store/actions/getArticle.action';


@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
})
export class EditArticleComponent implements OnInit {
initialValues$: Observable<ArticleInterface | null>;
isSubmitting$: Observable<boolean>;
isLoading$: Observable<boolean>;
slug: string;
backendErrors$:Observable<BackendErrorsInterface | null>;

  constructor(private store: Store,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.store.dispatch(getArticleAction({slug: this.slug}));

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)) as Observable<boolean>;
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector)) as Observable<BackendErrorsInterface | null> ;
    this.initialValues$ = this.store.pipe(select(editArticleSelector)),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList
      }
    }) 
  }

  onSubmit(articleInput: ArticleInputInterface): void {
   this.store.dispatch(updateArticleAction({slug: this.slug,articleInput}))
  }
}

