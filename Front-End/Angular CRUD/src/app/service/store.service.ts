import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  id: any;
  employeeName: any;
  api: String = 'http://localhost:8080/api/stores';

  constructor(private httpClient: HttpClient) { }

  // fetchAllStores(){
  //   return this.httpClient.get("assets/store.json");
  // }

  createStore(store: any){
    return this.httpClient.post(this.api + '/createStore', store);
  }

  updateStore(id: any, store: any){
    return this.httpClient.post(this.api + '/' + id, store);
  }

  fetchAllStores(){
    return this.httpClient.get(this.api + '/fetch');
  }
  deleteStore(storeId: any){
    return this.httpClient.delete(this.api + '/' + storeId);
  }

  fetchStoreById(id: any){
    return this.httpClient.get(this.api + '/storeById/' + id);
  }

  setStoreId(id: any) {
    this.id = id;
}

   getStoreId() {
     return this.id;
}

setEmployeeName(employeeName: any){
  this.employeeName = employeeName;
}
getEmployeeName(){
  return this.employeeName;
}


}
