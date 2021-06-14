import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
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
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.clientFk = this.UserObj.clientFk;
    this.getClientStaffList();
  }

  getClientStaffList(): void {
    // this.userService.getClientStaffList(this.clientFk)
    //   .subscribe(
    //     data => {
    //       this.dataSource.data = data;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }
}
