import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/store/selectors';
import { ProfileInterface } from '../article/types/profileInterface';
import { getUserProfileAction } from './store/getUserProfile.action';
import { isLoadingSelector, errorSelector, userProfileSelector } from './store/selector';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
})

export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription$: Subscription;
  slug: string;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
    this.userProfileSubscription$.unsubscribe()
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.fetchUserProfile();
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))]
    ).pipe(map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
      return currentUser.username === userProfile.username
    }))
    this.initializeListeners();
  }

  initializeListeners(): void{
    this.userProfileSubscription$ = this.store.pipe(select(userProfileSelector)).subscribe(
      (userProfile: any) => {
        this.userProfile = userProfile;
      }
    )
    this.route.params.subscribe((params:Params) => {
      this.slug = params['slug']
      this.fetchUserProfile();
    })
  }

  fetchUserProfile(): void{
       this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  getApiUrl(): string{
    const isFavorites = this.router.url.includes('favorites');
    this.apiUrl = isFavorites
    ? `/articles?favorited=${this.slug}`
    : `/articles?author=${this.slug}`;
    return this.apiUrl
  }
}
