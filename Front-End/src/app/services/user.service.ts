import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/api/user', data);
  }

  login(data: any): Observable<any> {
    return this.http.post(baseUrl + '/api/user' + '/login', data);
  }

  createClient(data: any): Observable<any> {
    return this.http.post(baseUrl + '/api/user' + '/client', data);
  }
}
