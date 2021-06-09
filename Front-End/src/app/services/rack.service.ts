import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(private http: HttpClient) { }

  getRackById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/api/rack/rackById/${id}`);
  }

  getRackByClientId(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/api/rack/clientFK/${id}`);
  }

  deleteRackById(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/rack/${id}`);
  }

  fetchAllRacks(tableName:any): Observable<any> {
    return this.http.get(`${baseUrl}/api/rack?name=${tableName}`);
  }

  createRack(rackData: any): Observable<any> {
    return this.http.post(baseUrl + '/api/rack/createRack', rackData);
  }

  updateRack(id: any,rackObject:any): Observable<any> {
    return this.http.put(baseUrl + '/api/rack/'+`${id}`,rackObject);
  }
}
