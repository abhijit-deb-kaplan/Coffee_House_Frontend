import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { USER_API_URL } from 'src/app/constants/constant';
import { SnackbarService } from '../snackbar/snackbar.service';
import {
  IUser,
  IUserLoginRequest,
  IUserLoginResponse,
  IUserSignupRequest,
} from 'src/app/interfaces/users.interface';
import { AuthServiceService } from '../authService/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = USER_API_URL;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private email = new BehaviorSubject<string>('');
  private userDetails = new BehaviorSubject<IUser>(null);

  user$ = this.userDetails.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    public customSnackbar: SnackbarService
  ) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get email$(): Observable<string> {
    return this.email.asObservable();
  }

  signup(signupData: IUserSignupRequest): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, signupData);
  }

  login(loginData: IUserLoginRequest): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, loginData);
  }

  logout(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, credentials);
  }

  onSuccessfulLogin(user: IUserLoginResponse['user']) {
    this.isAuthenticated.next(true);
    this.email.next(user.email);
    this.userDetails.next(user);
  }

  onSuccessfulLogout() {
    this.isAuthenticated.next(false);
  }

  updateUser(user: IUserLoginResponse['user']) {
    this.userDetails.next(user);
  }
}
