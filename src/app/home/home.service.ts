import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, timeout } from 'rxjs/operators';
import { Employee } from './employee/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl: any;
  private timeOut = 30000;

  headers_object = new HttpHeaders().set('Content-Type', 'application/json');

  httpOptions = {
    headers: this.headers_object,
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.api;
  }

  getAllEmpl() {
    return this.http.get<any>(this.apiUrl + 'employee', this.httpOptions).pipe(
      map((res) => {
        return res;
      }),
      timeout(this.timeOut)
    );
  }

  getEmplById(id: string) {
    return this.http
      .get<any>(this.apiUrl + 'employee/' + id, this.httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        timeout(this.timeOut)
      );
  }

  createEmpl(empl: any) {
    return this.http
      .post<any>(this.apiUrl + 'employee', empl, this.httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        timeout(this.timeOut)
      );
  }

  updateEmpl(empl: any, id: string) {
    return this.http
      .put<any>(this.apiUrl + 'employee/' + id, empl, this.httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        timeout(this.timeOut)
      );
  }

  deleteEmplId(id: number) {
    return this.http
      .delete<any>(this.apiUrl + 'employee/' + id, this.httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        timeout(this.timeOut)
      );
  }
}
