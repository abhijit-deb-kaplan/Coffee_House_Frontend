import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { COFFEE_MENU_API_URL } from 'src/app/constants/constant';
import { AuthServiceService } from '../authService/auth-service.service';
import { IMenuData } from 'src/app/interfaces/coffeemenu.interface';

@Injectable({
  providedIn: 'root',
})
export class CoffeeMenuService {
  private apiUrl = COFFEE_MENU_API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  getCoffeeMenu(page: number, pageSize: number): Observable<IMenuData[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<IMenuData[]>(`${this.apiUrl}/menu`, { headers, params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching coffee menu:', error);
          return throwError(error);
        })
      );
  }
}
