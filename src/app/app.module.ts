import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule, EffectsRootModule } from "@ngrx/effects";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopBarModule } from './shared/components/top-bar/topBar.module';
import { PersistanceService } from './shared/services/persistance.service';
import { AuthInterceptor } from './shared/services/authinterceptor.service';
import { GlobalFeedModule } from './components/global-feed/globalFeed.module';
import { RouterModule } from '@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { YourFeedModule } from './components/your-feed/yourFeed.module';
import { TagFeedModule } from './components/tag-feed/tag-feed.module';
import { ArticleModule } from './components/article/article.module';
import { CreateArticleModule } from './components/create-article/createArticle.module';
import { EditArticleModule } from './components/edit-article/editArticle.module';
import { SettingsModule } from './components/settings/settings.module';
import { AddToFavoritesModule } from './components/add-to-favorites/add-to-favorites.module';
import { UserProfileModule } from './components/user-profile/user-profile.module';



@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot(),
    AuthModule,
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,//important order
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    AddToFavoritesModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
     {
      provide: HTTP_INTERCEPTORS, //multirpovider token
      useClass: AuthInterceptor, // spread view instead short
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
