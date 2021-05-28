import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  showError = false;
  showSuccess = false;
  user: User = {
    email: '',
    password: '',
  };
  
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  onFormSubmit() {
    this.submitted = true;
    if (this.user.email == "") {
      return;
    }
    const data = {
      email: this.user.email,
      password: this.user.password,
    };
    this.userService.login(data)
    .subscribe(
      response => {
        console.log(response);
        if(!!response){
          this.submitted = true;
          this.router.navigate(['/tutorials']);
        } else{
          this.showError = true;
        }
      },
      error => {
        console.log(error);
      });
  }
}
