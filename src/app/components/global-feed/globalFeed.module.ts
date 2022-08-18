import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BannerModule } from "src/app/shared/components/banner/banner.module";
import { FeedTogglerModule } from "src/app/shared/components/feed-toggler/feed-toggler.module";
import { PopularTagsModule } from "src/app/shared/components/popular-tags/popular-tags.module";
import { FeedModule } from "../feed/feed.module";
import { GlobalFeedComponent } from "./global-feed.component";


const routes = [
    {
        path: '',
        component: GlobalFeedComponent
    }
]
@NgModule({
    imports: [CommonModule,
              RouterModule.forChild(routes),
              FeedModule,
              BannerModule,
              PopularTagsModule,
              FeedTogglerModule],
    declarations: [GlobalFeedComponent],
})

export class GlobalFeedModule {
    
}