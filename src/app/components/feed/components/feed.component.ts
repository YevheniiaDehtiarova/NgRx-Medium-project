import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from '../store/actions/getFeed.action';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { isLoadingSelector, errorSelector, feedSelector } from '../store/selectors';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { parseUrl, stringify } from 'query-string';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps: string;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface>;
  feed: GetFeedResponseInterface;
  limit = environment.limit;
  baseUrl: string;
  queryParamSubscription: Subscription;
  currentPage: number;
  isApiUrlChanged: boolean;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnChanges(changes: SimpleChanges): void {
   const isApiUrlChanged = !changes['apiUrlProps'].firstChange &&
   changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue;
   if(isApiUrlChanged){
    this.fetchFeed();
   }
  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector)) as Observable<GetFeedResponseInterface>;
    this.baseUrl = this.router.url.split('?')[0];
    this.feed$.subscribe((value) => {
      this.feed = value;
    });
  }

  initializeListeners(): void {
    this.queryParamSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    })
  }

  fetchFeed(): void {
    const offset = this.currentPage*this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }
}
