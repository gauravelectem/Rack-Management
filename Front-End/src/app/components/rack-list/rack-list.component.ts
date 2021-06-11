import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RackService } from '../../services/rack.service';
import { DatePipe } from '@angular/common'
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.css']
})
export class RackListComponent implements OnInit {
   rackObject:any;
  displayedColumns: string[] = [ 'id', 'name', 'no_of_rows', 'no_of_columns','createdon','edit','delete'];
  dataSource = new MatTableDataSource<any>();
  rackObj: any = {
    name: '',
    createdon:'',
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search: string = '';
  datePicker:string='';
  UserObj: any = {};

  constructor(private rackService:RackService,public datepipe: DatePipe,
    private router: Router) { }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
     this.rackObj.client_fk = this.UserObj.clientFk;
    this.dataSource.paginator = this.paginator;
    this.fetchRack();
  }

  fetchRack(): any {
    this.rackObj.name=this.search;
    this.rackObj.createdon=undefined;
    this.rackService.searchRack(this.rackObj)
    .subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  fetchDate(): any {
    this.rackObj.rackName=undefined;
    this.rackObj.createdon = this.datePicker;
    this.rackObj.createdon = this.datepipe.transform(this.rackObj.createdon.toLocaleDateString(), 'yyyy-MM-dd');
    this.rackService.searchRack(this.rackObj)
    .subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  fetchRackById(id:any): any {
    this.rackService.getRackById(id)
      .subscribe(
        response => {
          this.rackObject=response;
          this.router.navigate(['/editRack',this.rackObject.id])
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteRack(id:any): void {
    this.rackService.deleteRackById(id)
      .subscribe(
        response => {
          this.rackObject=response;
          console.log(response);
          this.router.navigate(['/rackList']);
        },
        error => {
          console.log(error);
        });
  }

}


