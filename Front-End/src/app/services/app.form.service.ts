import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/template.model';
import { Product } from 'src/app/models/form.model';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }
  
  getAll(clientFk:any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/api/items?clientFk=${clientFk}`);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/api/items/${id}`);
  }

  getById(name:any, id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/api/items/${name}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/api/items', data);
  }

  saveForm(data: any): Observable<any> {
    return this.http.post(baseUrl + '/api/items', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/api/items/${id}`, data);
  }

  updateForm(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/api/items/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/items/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+'/api/items');
  }

  findByTitle(name: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}/api/items?name=${name}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(baseUrl+'/api/form', data);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl+'/api/form');
  }

  getAllProductsByItemTempId(itemTempId:any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/api/form?itemTempId=${itemTempId}`);
  }

  getFormData(id: any): Observable<Product> {
    return this.http.get(`${baseUrl}/api/form/${id}`);
  }

  updateProductForm(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/api/form/${id}`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/form/${id}`);
  }

  findByFormsName(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/api/form?name=${name}`);
  }
}
