import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { Product } from 'src/app/models/product.model';

const baseUrl = 'http://localhost:8080/api/items';
const formBaseUrl = 'http://localhost:8080/api/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  saveForm(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  updateForm(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(name: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?name=${name}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(formBaseUrl, data);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(formBaseUrl);
  }

  getFormData(id: any): Observable<Product> {
    return this.http.get(`${formBaseUrl}/${id}`);
  }
  
  updateProductForm(id: any, data: any): Observable<any> {
    return this.http.put(`${formBaseUrl}/${id}`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${formBaseUrl}/${id}`);
  }

  findByFormsName(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${formBaseUrl}?name=${name}`);
  }
}
