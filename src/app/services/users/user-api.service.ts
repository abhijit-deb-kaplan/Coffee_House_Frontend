import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { USER_API_URL } from 'src/app/constants/constant';
import { SnackbarService } from '../snackbar/snackbar.service';
import {
  UserLoginRequest,
  UserLoginResponse,
  UserSignupRequest,
} from 'src/app/interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = USER_API_URL;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');
  private email = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    public customSnackbar: SnackbarService
  ) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  get username$(): Observable<string> {
    return this.username.asObservable();
  }
  get email$(): Observable<string> {
    return this.email.asObservable();
  }

  signup(signupData: UserSignupRequest): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, signupData);
  }

  login(loginData: UserLoginRequest): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, loginData);
  }

  logout(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, credentials);
  }

  onSuccessfulLogin(user: UserLoginResponse['user']) {
    this.isAuthenticated.next(true);
    this.username.next(user.firstName + ' ' + user.lastName);
    this.email.next(user.email);
  }
  onSuccessfulLogout() {
    this.isAuthenticated.next(false);
    this.username.next('');
  }
}
