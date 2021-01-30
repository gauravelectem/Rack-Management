import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailGroupService {

  emailGroupId: any;

  api = 'http://localhost:8080/Api/EmailGroupController';
  constructor(private http: HttpClient) { }

  createEmailGroup(emailGroup: any){
    return this.http.post(this.api + '/saveEmailGroup', emailGroup);
  }

  fetchAllEmailGroups(){
    return this.http.get(this.api + '/fetchAllEmailGroups');
  }

  updateEmailGroup(emailGroupId: any, emailGroupObject: any){
    return this.http.post(this.api + '/updateEmailGroup/' + emailGroupId, emailGroupObject);
  }

  deleteEmailGroup(emailGroupId: any){
    return this.http.delete(this.api + '/deleteEmailGroup/' + emailGroupId);
  }

  fetchEmailGroupId(emailGroupId: any){
    return this.http.get(this.api + '/fetchEmailGroupId/' + emailGroupId);
  }

  setEmailGroupId(emailGroupId: any) {
    this.emailGroupId = emailGroupId;
  }

  getEmailGroupId() {
     return this.emailGroupId;
  }

}
