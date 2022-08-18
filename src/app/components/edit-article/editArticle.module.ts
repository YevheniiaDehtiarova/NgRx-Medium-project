import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ArticleFormModule } from "src/app/shared/components/article-form/article-form.module";
import { LoadingModule } from "src/app/shared/components/loading/loading.module";
import { ArticleService  as SharedArticleService} from '..//../shared/services/article.service'
import { EditArticleComponent } from "./edit-article.component";
import { EditArticleService } from "./edit-article.service";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { UpdateArticleEffect } from "./store/effects/updateArticle.effect";
import { reducers } from "./store/reducers";

const routes = [
    {
        path:'articles/:slug/edit',
        component: EditArticleComponent
    }
]
@NgModule({
    imports: [CommonModule,
         RouterModule.forChild(routes),
         EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
         StoreModule.forFeature('editArticle', reducers),
         ArticleFormModule,
         LoadingModule],
    declarations: [EditArticleComponent],
    providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule{

}