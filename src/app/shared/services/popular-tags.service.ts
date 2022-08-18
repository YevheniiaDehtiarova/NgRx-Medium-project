import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";
import { PopularTagType } from "../types/popularTag.type";

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}
  getPopularTags(): Observable<Array<PopularTagType>> {
    const url = environment.apiUrl + '/tags';

    return this.http.get(url).pipe(
      map((response: any) => {
        return response.tags;
      })
    );
  }
}
