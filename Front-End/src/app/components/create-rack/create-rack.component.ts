
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Rack } from '../../models/rack.model';
import { RackService } from '../../services/rack.service';
import { Tray } from '../../models/tray.model';

@Component({
  selector: 'app-create-rack',
  templateUrl: './create-rack.component.html',
  styleUrls: ['./create-rack.component.css']
})
export class CreateRackComponent implements OnInit {

  UserObj: any = {};

  rack: Rack = {
    name: '',
    no_of_rows: 0,
    no_of_columns:0,
    client_fk:0,
    createdon:''
  };

  tray: Tray = {
    x:0,
    y:0,
    h:0,
    w:0,
    name:'',
    img: '',
    cssClass:'',
    rack_fk:0,
  };

  constructor(
    private router: Router,
    private rackService: RackService,
    private formBuilder: FormBuilder,
  ) { }
  loading = false;
  submitted = false;
  rackForm: FormGroup;
  rackObj:any;
  createdon:any;

  ngOnInit() {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
     this.rack.client_fk = this.UserObj.clientFk;
    this.rackForm = this.formBuilder.group({
      name : ['', Validators.required],
      no_of_rows: ['', [Validators.required ]],
      no_of_columns: ['', [Validators.required]],
      createdon:['', [Validators.required]],
      client_fk:this.UserObj.clientFk,
  });
  }

  get f() { return this.rackForm.controls; }

  saveRack(): void {
    this.submitted = true;
    if (this.rackForm.invalid) {
      return;
    }
    this.rackService.createRack(this.rackForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.createTrayObject(response.id,response.no_of_rows,response.no_of_columns);
          this.router.navigate(['/rackList']);
              },
              error => {
                console.log(error);
              });
  }

  createTrayObject(id:any,no_of_rows:any,no_of_columns:any){
    for (let i = 1; i <=no_of_rows; i++) {
      for (let j = 1; j <=no_of_columns; j++) {
              this.tray.rack_fk=id;
              this.tray.x=i;
              this.tray.y=j;
              this.tray.w=1;
              this.tray.h=1;
              this.tray.name="r"+this.tray.x+"c"+this.tray.y;
              this.saveTray(this.tray);
      }
      
    }
  }

  saveTray(trayObject:any): void {
    this.rackService.createTray(trayObject)
      .subscribe(
        response => {
          console.log(response);
              },
              error => {
                console.log(error);
              });
  }
}
