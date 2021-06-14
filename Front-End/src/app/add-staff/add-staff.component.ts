import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { Staff } from '../models/staff.model';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  staff: Staff = {
    username: '',
    email: '',
    password: '',
  };
  UserObj: any = {};
  staffRoleID: ''
  constructor(  private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,) { }

    loading = false;
    submitted = false;
    staffForm: FormGroup;
  ngOnInit(): void {
    this.getStaffRole();
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.staffForm = this.formBuilder.group({
      username : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      clientFk: this.UserObj.clientFk,
      status: 'ACTIVE',
      roleId: this.staffRoleID,
  });
  }

  get f() { return this.staffForm.controls; }

  saveClientStaff(): void {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }
    this.staffForm.value.roleId = this.staffRoleID;
    this.userService.saveClientStaff(this.staffForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/staff']);
          },
        error => {
          console.log(error);
        });
  }

  getStaffRole(): void {
    this.userService.getStaffRole()
        .subscribe(
            data => {
                this.staffRoleID = data[0].id;
            },
            error => {
                console.log(error);
  });
}

}
