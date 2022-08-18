import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getArticleAction } from '../store/actions/getArticle.action';
import { ArticleInterface } from '../types/articleInterface';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { articleSelector, isLoadingSelector, errorSelector } from '../store/selectors';
import { currentUserSelector} from  '../../../store/selectors';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import { deleteArticleAction } from '../store/actions/deleteArticle.action';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    
    this.isAuthor$ = combineLatest(
      [this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))]
    ).pipe(map(([article, currentUser]:
       [ArticleInterface | null, 
        CurrentUserInterface | null]) => {
       if(!article || !currentUser) {
        return false
       }
       return currentUser.username === article.author?.username
    }))
  }

  initializeListeners(): void {
    this.articleSubscription = this.store.pipe(select(articleSelector))
      .subscribe(((article: ArticleInterface | null) => {
        this.article = article;
      }))
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}))
  }
}
