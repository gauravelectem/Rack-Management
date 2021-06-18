import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/userProfile.model';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  UserObj: any = {};
  profile: Profile = {
    id:0,
    userName: '',
    email: '',
    address: '',
    city: '',
    img: '',
    phone:'',
    user_fk:0
  };
  constructor(private userProfile:UserProfileService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
      this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
      this.profile.user_fk = this.UserObj.clientFk; 
      this.fetchProfileObject(this.route.snapshot.params.id);
  }

  fetchProfileObject(id:any): any {
    this.userProfile.fetchProfileByUserFK(id)
      .subscribe(
        response => {
          this.profile=response;
        },
        error => {
          console.log(error);
        });
  }

  onSubmit() {   
     this.updateProfile()
  }

  updateProfile(): any {
    this.userProfile.updateProfile(this.profile[0].id,this.profile[0])
      .subscribe(
        response => {
          this.profile=response;
        },
        error => {
          console.log(error);
        });
  }

}
