import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RackService } from '../../services/rack.service';
import { DatePipe } from '@angular/common'
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.css']
})
export class RackListComponent implements OnInit {
   rackObject:any;
  displayedColumns: string[] = [ 'id', 'name', 'no_of_rows', 'no_of_columns','createdon','action'];
  dataSource = new MatTableDataSource<any>();
  rackObj: any = {
    name: '',
    client_fk: 1,
    createdon:'',
  };
  search: string = '';
  datePicker:string='';

  constructor(private rackService:RackService,public datepipe: DatePipe,
    private router: Router) { }

  ngOnInit(): void {
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


