import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ArticleFormModule } from "src/app/shared/components/article-form/article-form.module";
import { CreateArticleComponent } from "./create-article.component";
import { CreateArticleService } from "./create-article.service";
import { createArticleEffect } from "./store/effects/createArticle.effect";
import { reducers } from "./store/reducers";

const routes = [
    {
        path:'articles/new',
        component: CreateArticleComponent
    }
]
@NgModule({
    imports: [CommonModule,
         RouterModule.forChild(routes),
         EffectsModule.forFeature([createArticleEffect]),
         StoreModule.forFeature('createArticle', reducers),
         ArticleFormModule],
    declarations: [CreateArticleComponent],
    providers: [CreateArticleService]
})
export class CreateArticleModule{

}