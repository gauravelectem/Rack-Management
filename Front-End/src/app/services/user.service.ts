import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
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


  saveClientStaff(data: any): Observable<any> {
    return this.http.post(baseUrl + '/api/user/client/staff/save', data);
  }

  getStaffRole(): Observable<any> {
    return this.http.get(`${baseUrl}/api/user/client/staff/role`);
  }
}
