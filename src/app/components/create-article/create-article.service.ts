import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ArticleInputInterface } from "src/app/shared/types/articleInput.interface";
import { SaveArticleResponseInterface } from "src/app/shared/types/saveArticleResponse.interface";
import { environment } from "src/environments/environment";
import { ArticleInterface } from "../feed/types/articleInterface";

@Injectable()
export class CreateArticleService{
    constructor(private http: HttpClient) {}

    createArticle(articleInput: ArticleInputInterface): Observable<ArticleInterface>{
        const fullUrl = environment.apiUrl + '/articles'

        return this.http.post<SaveArticleResponseInterface>(fullUrl,articleInput)
        .pipe(map((response: SaveArticleResponseInterface) => response.article))
    }
}