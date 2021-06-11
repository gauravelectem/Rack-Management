import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Rack } from '../../models/rack.model';
import { RackService } from '../../services/rack.service';

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
    client_fk:1,
  };

  constructor(
    private router: Router,
    private rackService: RackService,
    private formBuilder: FormBuilder,
  ) { }
  loading = false;
  submitted = false;
  rackForm: FormGroup;

  ngOnInit() {
    this.rackForm = this.formBuilder.group({
      name : ['', Validators.required],
      no_of_rows: ['', [Validators.required ]],
      no_of_columns: ['', [Validators.required]],
      client_fk:1,
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
          this.router.navigate(['/rackList']);
              },
              error => {
                console.log(error);
              });
  }
}
