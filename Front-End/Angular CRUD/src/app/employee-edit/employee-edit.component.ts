import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    EmployeeService
} from '../service/Employee.service';
import {DatePipe} from '@angular/common';
import { AlertService } from '@app/_services/alert.service';
import { StoreService } from '@app/service/store.service';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.less']
})
export class EmployeeEditComponent implements OnInit {

    formSection!: FormGroup;
    employeeObject: any;
    employeeList: any;
    employeeId: any;
    emailGroupsList: any;
    selectedEmailGroupNames: any;
    groupNames: any;
    dateOfBirth: any;
    employeeEmailGroups: any;
    timeZoneValue: any;
    data: any;
    createdOn: any;
    submitted = false;
    inValidForm = false;
    storeId: any;

    constructor(private formBuilder: FormBuilder,
                private employeeService: EmployeeService,
                private alertService: AlertService,
                private storeService: StoreService,
                private route: ActivatedRoute,
                private router: Router ) {}

    ngOnInit() {
        this.employeeId = this.employeeService.getEmployeeId();
        this.storeId = this.employeeService.getStoreId();
        if (this.employeeId !== undefined && this.employeeId !== null) {
            this.fetchEmployeeById(this.employeeId);
        } else {
              this.formSection = this.formBuilder.group({
                // timeZoneValue:['',{ updateOn: this.employeeService.getTimeZone()}],
                employeeName: ['', Validators.required],
                role: ['', Validators.required],
                salary: ['', Validators.required],
                city: ['', Validators.required],
                // birthDate: ['', Validators.required],
                // gender: ['', Validators.required],
                // active: ['', Validators.required],
                // groupNames: ['', Validators.required],
                // createdOn:['',Validators.required]
            });
        }

    }

    get f() {
        return this.formSection.controls;
    }


    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        this.checkEveryField();

        if (this.inValidForm) {
            return;
        }
        if (this.employeeId == null && this.employeeId == undefined) {
            this.createEmployee();
        } else {
            this.employeeService.updateEmployee(this.employeeId, this.formSection.value)
                .subscribe((data) => {
                    this.employeeList = data;
                    this.employeeService.fetchEmployeeStoreById(this.storeId);
                });
        }
        this.reDirectToEmployee();
    }

    checkEveryField(){

        if (this.formSection.value.employeeName !== '' &&
            this.formSection.value.role !== '' &&
            this.formSection.value.salary !== '' &&
            this.formSection.value.city !== ''){
            this.inValidForm = false;
         }else{
            this.inValidForm = true;
        }
    }
    reDirectToEmployee() {
        this.router.navigate(['/employees'], {
            relativeTo: this.route
        });

    }

    reDirectToEmailGroupPage(){
        this.router.navigate(['/emailGroup'], {
            relativeTo: this.route
        });
    }

    // This method is used to save employee object
    createEmployee() {
        this.employeeService.createEmployee(this.storeId, this.formSection.value)
            .subscribe((data) => {
                this.employeeList = data;
                this.employeeService.fetchEmployeeStoreById(this.storeId);
            });
    }

    // This method is used to fetch employee object by employeeId
    fetchEmployeeById(employeeId: any) {
        this.employeeService.fetchEmployeeById(employeeId)
            .subscribe((data) => {
                this.employeeObject = data;
                // this.dateOfBirth=new DatePipe('en-US').transform(this.employeeObject.birthDate,'MM/dd/yyyy')
                // this.employeeEmailGroups = this.employeeObject.emailGroups;
                // this.selectedEmailGroupNames = this.employeeObject.groupNames;
                // this.groupNames = this.employeeObject.allGroupNames;
                // this.createdOn=this.employeeObject.createdOn;
                this.loadFormWithData(this.employeeObject);
            });
    }

    fetchEmailGroups() {
        this.employeeService.fetchEmailGroups()
            .subscribe((data) => {
                this.emailGroupsList = data;
            });
    }

    // This method is used to load the form according to selected employee
    loadFormWithData(employeeObject: any) {
        this.formSection = this.formBuilder.group({
            employeeName: [employeeObject.employeeName, Validators.required],
            salary: [employeeObject.salary, Validators.required],
            role: [employeeObject.role, Validators.required],
            city: [employeeObject.city, Validators.required]
            // birthDate: [this.dateOfBirth, Validators.required],
            // gender: [employeeObject.gender, Validators.required],
            // active: [this.employeeObject.active, Validators.required],
            // groupNames: [this.groupNames, Validators.required],
        });
    }

}
