import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RackService } from '../../services/rack.service';
import { DatePipe } from '@angular/common'
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.css']
})
export class RackListComponent implements OnInit {
   rackObject:any;
   client_fk:any;
  displayedColumns: string[] = [ 'id', 'name', 'no_of_rows', 'no_of_columns','createdon','edit','delete','tray-view'];
  dataSource = new MatTableDataSource<any>();
  rackObj: any = {
    name: '',
    createdon:'',
  };
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  search: string = '';
  datePicker:string='';
  UserObj: any = {};

  constructor(private rackService:RackService,public datepipe: DatePipe,
    private router: Router,private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
     this.rackObj.client_fk = this.UserObj.clientFk;
    this.dataSource.paginator = this.paginator;
    this.rackObj.client_fk=this.route.snapshot.params.id
    this.rackListing(this.rackObj.client_fk);
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

  fetchTrayView(id:any): any {
          this.router.navigate(['/racklayout',id])
  }

  deleteRack(id:any): void {
    this.rackService.deleteRackById(id)
      .subscribe(
        response => {
          this.rackObject=response;
          this.alertService.success(response.message,this.options)
          this.rackListing(this.rackObj.client_fk);
        },
        error => {
          console.log(error);
          this.alertService.error(error.error.message,this.options)
        });
  }

  rackListing(client_fk): void{
    this.rackService.fetchAllRacks(client_fk)
    .subscribe((data: any) => {
      this.dataSource.data = data;
    },
      error => {
        console.log(error);
      });
    
  }
  

  cancel(): void{
    this.router.navigate(['/createRack']);
  }

}


