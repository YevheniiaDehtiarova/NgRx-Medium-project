import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { getPopularTagsAction } from '../store/getPopularTags.action';
import { popularTagsSelector, isLoadingSelector, errorSelector } from '../store/selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
})
export class PopularTagsComponent implements OnInit {
 popularTags$: Observable<Array<PopularTagType> | null>;
 popularTag: Array<PopularTagType> | null;
 isLoading$: Observable<boolean>;
 error$: Observable<string | null>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void{
   this.popularTags$ = this.store.pipe(select(popularTagsSelector));
   this.isLoading$ = this.store.pipe(select(isLoadingSelector));
   this.error$= this.store.pipe(select(errorSelector));
   this.popularTags$.subscribe((value)=> {
    this.popularTag = value;
   });
  }

  fetchData():void{
    this.store.dispatch(getPopularTagsAction())
  }

}
