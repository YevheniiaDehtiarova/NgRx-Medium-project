import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfileInterface } from "../article/types/profileInterface";
import { GetUserProfileResponseInterface } from "./store/types/getUserProfileResponse.interface";

@Injectable()
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getUserProfile(slug: string): Observable<ProfileInterface> {
        const url = `${environment.apiUrl}/profiles/${slug}`;

        return this.http.get<any>(url).pipe(map(
            (res: GetUserProfileResponseInterface) => {
                return res.profile
            }
        ))
    }

}