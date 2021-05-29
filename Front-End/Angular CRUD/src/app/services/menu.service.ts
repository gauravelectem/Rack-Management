import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:8080/api/menu/role';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getRoleById(roleId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${roleId}`);
  }
}
