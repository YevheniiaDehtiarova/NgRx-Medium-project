import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ArticleInterface } from '../article/types/articleInterface';
import { createArticleAction } from './store/actions/createArticle.action';
import { isSubmittingSelector, validationErrorsSelector } from './store/selector';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent implements OnInit {
   initialValues: ArticleInterface =  {
    title: '',
    description: '',
    body: '',
    tagList: []
}
isSubmitting$: Observable<boolean>;
backendErrors$:Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector)) as Observable<boolean>;
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
   this.store.dispatch(createArticleAction({articleInput}))
  }

}
