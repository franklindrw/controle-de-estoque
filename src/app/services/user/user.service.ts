import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupUserReq } from 'src/app/models/interfaces/user/SignupUserReq';
import { SignupUserRes } from 'src/app/models/interfaces/user/SignupUserRes';
import { AuthReq } from 'src/app/models/interfaces/user/auth/AuthReq';
import { AuthRes } from 'src/app/models/interfaces/user/auth/AuthRes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.URL_BASE;

  constructor(private httpClient: HttpClient) { }

  signupUser(reqData: SignupUserReq): Observable<SignupUserRes> {
    return this.httpClient.post<SignupUserRes>(`${this.API_URL}/user`, reqData);
  }

  authUser(reqData: AuthReq): Observable<AuthRes> {
    return this.httpClient.post<AuthRes>(`${this.API_URL}/auth`, reqData);
  }
}
