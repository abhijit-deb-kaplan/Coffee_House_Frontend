import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_API_URL } from 'src/app/constant';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private apiUrl = USER_API_URL;

  constructor(private http: HttpClient) {}

  signup(signupData: any): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, signupData);
  }

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, loginData);
  }

}
