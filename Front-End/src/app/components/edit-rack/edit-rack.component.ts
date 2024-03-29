import { DatePipe } from '@angular/common';
import { Rack } from './../../models/rack.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RackService } from '../../services/rack.service';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-edit-rack',
  templateUrl: './edit-rack.component.html',
  styleUrls: ['./edit-rack.component.css']
})
export class EditRackComponent implements OnInit {
  rackId:any;
  client_fk:any;
  rackObject: Rack = {
    name: '',
    no_of_rows: 0,
    no_of_columns: 0,
  };
  UserObj: any = {};
  options = {
    autoClose: true,
    keepAfterRouteChange: false
 };
  constructor(private route: ActivatedRoute,
    private router: Router,
    private rackService:RackService,
    public datepipe: DatePipe,
    private alertService:AlertService) { }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.client_fk = this.UserObj.clientFk;
    this.rackId = this.route.snapshot.params['id'];
    console.log(this.rackId);

    this.rackService.getRackById(this.rackId)
    .subscribe(data => {
      console.log(data)
      this.rackObject = data;
      this.rackObject.createdon =  this.datepipe.transform(this.rackObject.createdon,"yyyy-MM-dd");
    }, error => console.log(error));
  }

  onSubmit() {   
    this.updateRack()
  }

  updateRack() {
    this.rackService.updateRack(this.rackId,this.rackObject)
      .subscribe(data => {
        console.log(data);
        this.rackObject = data;
          this.router.navigate(['/rackList',this.client_fk]);
      },  error => {
        console.log(error);
      });
  }

  fetchAllRacks(){
    this.router.navigate(['/rackList',this.client_fk]);
  }

 

}
