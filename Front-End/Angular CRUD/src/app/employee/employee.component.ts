import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router,
    ActivatedRoute
} from '@angular/router';
import { AlertService } from '@app/_services';
import {
    EmployeeService
} from '../service/Employee.service';
import * as store from 'src/assets/store.json';
import { StoreService } from '@app/service/store.service';


@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {

    employeeList: any;
    errorMessage: any;
    employeeObject: any;
    employeeName: any;
    stores: any;
    storeId: any;

    constructor(private employeeService: EmployeeService,
                private alertService: AlertService,
                private storeService: StoreService,
                private router: Router,
                private route: ActivatedRoute, ) {}

    ngOnInit() {
        this.stores = store.stores;
        this.storeId = this.storeService.getStoreId();
        this.employeeName = this.storeService.getEmployeeName();
        this.fetchEmployeeStoreById(this.storeId);
    }

    reDirectToEditEmployee() {
        this.router.navigate(['/editEmployee'], {
            relativeTo: this.route
        });

    }

    fetchEmployeeStoreById(storeId: any) {

        this.employeeService.fetchEmployeeStoreById(storeId)
        .subscribe((data) => {
            this.employeeList = data;
        });
    }

    reDirectToAddPage() {
        this.employeeService.setEmployeeId(null);
        this.router.navigate(['/editEmployee'], {
            relativeTo: this.route
        });
    }

    redirectToEmployeeWithId(id: any) {
        this.employeeService.setEmployeeId(id);
        this.router.navigate(['/editEmployee'], {
            relativeTo: this.route
        });
    }

    reDirectEmployeesList(){
        this.router.navigate(['/employees'], {
            relativeTo: this.route
        });
    }


    deleteEmployee(employeeId: any) {
        this.employeeService.deleteEmployeeById(employeeId)
            .subscribe((data) => {
                this.employeeList = data;
                this.fetchEmployeeStoreById(this.storeId);
            });

    }

}
