import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ErrorMessageModule } from "src/app/shared/components/error-message/error-message.module";
import { LoadingModule } from "src/app/shared/components/loading/loading.module";
import { PaginationModule } from "src/app/shared/components/pagination/pagination.module";
import { TagListModule } from "src/app/shared/components/tag-list/tag-list.module";
import { AddToFavoritesModule } from "../add-to-favorites/add-to-favorites.module";
import { FeedComponent } from "./components/feed.component";
import { FeedService } from "./feed.service";
import { GetFeedEffect } from "./store/effects/getFeed.effect";
import { reducers } from "./store/reducers";

@NgModule({
  imports: [CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule, ErrorMessageModule, LoadingModule,PaginationModule, TagListModule, AddToFavoritesModule],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})

export class FeedModule {

}