import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../models/userProfile.model';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id:any;
  profileObject:any;
  profile: Profile = {
   password:'',
   confirmPassword:'',
   user_fk:0,
  };

  constructor(private router: Router,private userProfile:UserProfileService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.profile.user_fk=this.id;
  }
  updatePassword(): any {
    if (this.profile.password == this.profile.confirmPassword) {
      this.userProfile.updatePassword(this.id, this.profile)
        .subscribe(
          data => {
            this.profileObject = data;
          },
          error => {
            console.log(error);
          });
    }

  }
  }

