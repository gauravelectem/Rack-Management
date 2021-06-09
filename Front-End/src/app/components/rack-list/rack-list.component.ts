import { Client } from './../../client';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RackService } from '../../services/rack.service';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.css']
})
export class RackListComponent implements OnInit {
   rackObject:any;
  displayedColumns: string[] = ['id', 'rackName', 'no_of_rows', 'no_of_columns'];
  dataSource = new MatTableDataSource<any>();

   constructor(  private router: Router,private http: HttpClient,
     private rackService:RackService) { }

    
   ngOnInit(): void {
     this.fetchRackByClientId();
   }

   fetchRackByClientId(): void {
     this.http.get('/assets/testdata/rackListingById.json')
       .subscribe((data: any) => {
         this.dataSource.data = data;
       }); 
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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


