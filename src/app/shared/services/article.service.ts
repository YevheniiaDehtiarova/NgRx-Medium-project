import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetArticleResponseInterface } from "../types/getArticleResponse.interface";


@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) { }
    getArticle(slug: string): Observable<GetArticleResponseInterface> {
        const fullUrl = `${environment.apiUrl}/articles/${slug}`

        return this.http.get<GetArticleResponseInterface>(fullUrl).pipe(map(
            (response: any) => {
                return response.article
            }
        ))
    }
}