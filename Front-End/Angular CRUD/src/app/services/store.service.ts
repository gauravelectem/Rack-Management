import { Observable } from 'rxjs';
import { Store } from './../models/store.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'http://localhost:8080/api/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Store[]> {
    return this.http.get<Store[]>(`${baseUrl}/`);
  }

}
