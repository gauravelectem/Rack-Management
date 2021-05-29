import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(baseUrl + '/login', data);
  }

  createClient(data: any): Observable<any> {
    return this.http.post(baseUrl + '/client', data);
  }
}