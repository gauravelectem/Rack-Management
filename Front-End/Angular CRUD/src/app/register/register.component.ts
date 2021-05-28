import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  user: User = {
    username: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  };

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }
  loading = false;
  submitted = false;

  ngOnInit() {
  }

  saveUser(): void {
    const data = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      phone: this.user.phone,
      location: this.user.location
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        });
  }

}
