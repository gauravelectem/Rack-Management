import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:8080/api/menu/item';

const baseUrlForMenus = 'http://localhost:8080/api/menu/createMenu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getRoleById(roleId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${roleId}`);
  }

  getMenuByItemId(itemId: any): Observable<any> {
    return this.http.get(`${baseUrl}/${itemId}`);
  }

  fetchAllMenus(): Observable<any> {
    return this.http.get(`${baseUrlForMenus}`);
  }

  createMenu(data: any): Observable<any> {
    return this.http.post(baseUrlForMenus, data);
  }

}
