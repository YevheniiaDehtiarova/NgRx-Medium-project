import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GetArticleResponseInterface } from '../../shared/types/getArticleResponse.interface'
import { environment } from "src/environments/environment";
import { ArticleInterface } from "../article/types/articleInterface";

@Injectable()
export class AddToFavoriteService{
    constructor(private http:HttpClient){}

    addToFavorites(slug: string): Observable<ArticleInterface>{
        return this.http.post<any>(this.getUrl(slug),{}).pipe(map(this.getArticle))
    }

    removeFormFavorites(slug:string): Observable<ArticleInterface>{
       return this.http.delete<any>(this.getUrl(slug)).pipe(map(this.getArticle))
    }

    getUrl(slug: string): string {
        return `${environment.apiUrl}/articles/${slug}/favorite`
    }

    getArticle(response: GetArticleResponseInterface): ArticleInterface{
        return response.article;
    }
}