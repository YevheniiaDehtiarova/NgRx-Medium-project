import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule, EffectSources } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FeedModule } from "../feed/feed.module";
import { GetUserPrifileEffect } from "./store/getUserProgile.effect";
import { reducers } from "./store/reducer";
import { UserProfileComponent } from "./user-profile.component";
import { UserProfileService } from "./user-profile.service";


const routes = [
    {
        path: 'profiles/:slug',
        component: UserProfileComponent
    },
    {
        path: 'profiles/:slug/favorites',
        component: UserProfileComponent
    },
]

@NgModule({
    imports: [CommonModule,
              FeedModule,
              RouterModule.forChild(routes),
              EffectsModule.forFeature([GetUserPrifileEffect]),
              StoreModule.forFeature('userProfile', reducers)],
    declarations: [UserProfileComponent],
    providers: [ UserProfileService]
})

export class UserProfileModule{

}