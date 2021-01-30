import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/service/Employee.service';
import { StoreService } from '@app/service/store.service';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.less']
})
export class EditStoreComponent implements OnInit {

  formSection!: FormGroup;
  id: any;
  stores: any;
  storeObject: any;
  storeObjectObtained: any;
  employeeNames: any;
  selectedEmployeeNames: any;
  submitted = false;
  inValidForm = false;

  constructor(private formBuilder: FormBuilder,
              private storeService: StoreService,
              private alertService: AlertService,
              private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.storeService.getStoreId();
    if (this.id !== undefined && this.id !== null) {
        this.fetchStoreById(this.id);
    }

    else{
      this.formSection = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        longitude: ['', Validators.required],
        lattitude: ['', Validators.required]
      });
    }
  }

  fetchStoreById(id: any){
    this.storeService.fetchStoreById(id)
    .subscribe((data) => {
      this.stores = data;
      if (this.stores !== undefined){
        this.loadFormWithData(this.stores);
      }

  });

  }

  get f() { return this.formSection.controls; }

  onSubmit(){
    this.submitted = true;
    this.checkEveryField();

    if (this.inValidForm) {
          return;
      }
    if (this.id == null && this.id == undefined) {
      this.createStore();
  } else {
      this.updateStore(this.id, this.formSection.value);
  }
    this.reDirectToStoreListing();
  }

  checkEveryField(){

      if (this.formSection.value.name !== '' &&
          this.formSection.value.address !== '' &&
          this.formSection.value.lattitude !== '' &&
          this.formSection.value.longitude !== ''){
          this.inValidForm = false;
       }else{
          this.inValidForm = true;
      }
  }


  fetchEmployees(employee: any){
    this.employeeNames = [];
    this.selectedEmployeeNames = [];
    for (let index = 0; index < employee.length; index++) {
      this.selectedEmployeeNames.push(employee[index].employeeName);
    }
    this.employeeNames = this.selectedEmployeeNames;
  }

  loadFormWithData(store: any){
    this.formSection = this.formBuilder.group({
      name: [store.name, Validators.required],
      address: [store.address, Validators.required],
      longitude: [store.longitude, Validators.required],
      lattitude: [store.lattitude, Validators.required]
  });
  }
  createStore(){
    this.storeService.createStore(this.formSection.value)
    .subscribe((data) => {
      this.stores = data;
  });
    this.reDirectToStoreListing();
  }
  updateStore(id: any, storeObject: any){
    this.storeService.updateStore(id, storeObject)
    .subscribe((data) => {
      this.stores = data;
      this.reDirectToStoreListing();
  });

  }
  reDirectToStoreListing(){
    this.router.navigate(['/stores'], {
      relativeTo: this.route
  });
  }

}
