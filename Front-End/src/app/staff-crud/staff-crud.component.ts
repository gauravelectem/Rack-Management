import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-staff-crud',
  templateUrl: './staff-crud.component.html',
  styleUrls: ['./staff-crud.component.css']
})
export class StaffCrudComponent implements OnInit {
  UserObj: any = {};
  clientFk: '';
  displayedColumns: string[] = ['name', 'email', 'phone' ,'actions'];
  dataSource = new MatTableDataSource<any>();
  constructor(private userService: UserService, private router: Router,) { }
  roleId : ''
  ngOnInit(): void {
    this.getStaffByRole();
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.clientFk = this.UserObj.clientFk;
  }

  getClientStaffList(): void {
    this.userService.getClientStaffList(this.clientFk,this.roleId)
      .subscribe(
        data => {
          this.dataSource.data = data;
        },
        error => {
          console.log(error);
        });
  }
  
  getStaffByRole(): void {
    this.userService.getStaffRole()
        .subscribe(
            data => {
                this.roleId = data[0].id;
                this.getClientStaffList();
            },
            error => {
                console.log(error);
  });
}
}
