import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { CurrentUserInputInterface } from "src/app/shared/types/currentUserInput.interface";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient){}

    public getUser(reponse: AuthResponseInterface): CurrentUserInterface {
      return reponse.user;
    }
    
    public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
      const url = environment.apiUrl + '/users'

      return this.http.post<AuthResponseInterface>(url,data).pipe(map(this.getUser))
    }

    public login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
      const url = environment.apiUrl + '/users/login';

      return this.http.post<AuthResponseInterface>(url,data).pipe(map(this.getUser))
    }

    public getCurrentUser():Observable<CurrentUserInterface> {
      const url = environment.apiUrl + '/user';
      const user = this.getUser as any;

      return this.http.get(url).pipe(map(user))
    }

    public updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface>{
      const url = environment.apiUrl + '/user';
      return this.http.put<any>(url,currentUserInput).pipe(map(this.getUser))
    }

}