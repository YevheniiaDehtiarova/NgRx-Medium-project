import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSelector } from '../popular-tags/store/selectors';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss']
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initializeValues();
  }

  public initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoadingSelector));
  }

}
