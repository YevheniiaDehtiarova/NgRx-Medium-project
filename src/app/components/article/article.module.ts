import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ErrorMessageModule } from "src/app/shared/components/error-message/error-message.module";
import { LoadingModule } from "src/app/shared/components/loading/loading.module";
import { TagListModule } from "src/app/shared/components/tag-list/tag-list.module";
import { ArticleService  as SharedArticleService} from "../../shared/services/article.service";
import { ArticleService } from "./article.service";
import { ArticleComponent } from "./components/article.component";
import { DeleteArticleEffect } from "./store/effects/deleteArticle.effect";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { reducers } from "./store/reducers";

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]


@NgModule({
  imports: [CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule.forChild(routes), 
    ErrorMessageModule, 
    LoadingModule,
    TagListModule],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService]
})

export class ArticleModule {

}