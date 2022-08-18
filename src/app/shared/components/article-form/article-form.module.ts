import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BackendErrorMessagesModule } from "src/app/components/backend-error-messages/backendErrorMessagesModule";
import { ArticleFormComponent } from "./article-form.component";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, 
              BackendErrorMessagesModule],
    declarations: [ArticleFormComponent],
    exports: [ArticleFormComponent]
})
export class ArticleFormModule{

}