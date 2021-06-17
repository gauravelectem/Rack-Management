import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string='';
  userObject:any;
  constructor(private userService:UserService, private router: Router,
    private alertService:AlertService) { }

  ngOnInit(): void {
  }

  reset(): void {
    const user = {
      email: this.email
    };
    this.userService.resetPassword(user)
    .subscribe(
      response => {
        this.userObject=response;
        this.router.navigate(['/login'])
        console.log(response);
      },
      error => {
        console.log(error);
      });
    
  }

}
