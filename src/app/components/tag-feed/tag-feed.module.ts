import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BannerModule } from "src/app/shared/components/banner/banner.module";
import { FeedTogglerModule } from "src/app/shared/components/feed-toggler/feed-toggler.module";
import { PopularTagsModule } from "src/app/shared/components/popular-tags/popular-tags.module";
import { FeedModule } from "../feed/feed.module";
import { TagFeedComponent } from "./tag-feed.component";

const routes = [
    {
        path: 'tags/:slug',
        component: TagFeedComponent
    }
]
@NgModule({
    imports: [CommonModule,
              RouterModule.forChild(routes),
              FeedModule,
              BannerModule,
              PopularTagsModule,
              FeedTogglerModule],
    declarations: [TagFeedComponent],
})

export class TagFeedModule {
    
}