import { Rack } from './../../models/rack.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RackService } from '../../services/rack.service';

@Component({
  selector: 'app-edit-rack',
  templateUrl: './edit-rack.component.html',
  styleUrls: ['./edit-rack.component.css']
})
export class EditRackComponent implements OnInit {
  rackId:any;
  rackObject: Rack = {
    rackName: '',
    no_of_rows: 0,
    no_of_columns: 0,
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private rackService:RackService) { }

  ngOnInit(): void {
    this.rackId = this.route.snapshot.params['id'];
    console.log(this.rackId);

    this.rackService.getRackById(this.rackId)
    .subscribe(data => {
      console.log(data)
      this.rackObject = data;
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
        this.router.navigate(['/rackList']);
      }, error => 
      console.log(error));
  }

 

}
