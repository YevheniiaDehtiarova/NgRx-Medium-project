import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PopularTagsService } from '../../services/popular-tags.service';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/loading.module';
import { PopularTagsComponent } from './components/popular-tags.component';
import { GetPopularTagsEffect } from './store/getPopularTags.effect';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoadingModule,
    ErrorMessageModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
