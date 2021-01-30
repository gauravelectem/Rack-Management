import {
    Injectable
} from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    api = 'http://localhost:8080/Api/EmployeeController';
    storeApi = 'http://localhost:8080/api/stores';
    employeeId: any;
    timeZoneValue: any;
    id: any;

    constructor(private http: HttpClient) {}

    fetchEmployeeStoreById(storeId: any) {
        return this.http.get(this.storeApi + '/fetchEmployeeStoreById/' + storeId);
    }

    createEmployee(storeId: any, employee: any) {
        // employee.empTimeZone = this.timeZoneValue;
        employee.storeId = storeId;
        return this.http.post(this.storeApi + '/employee', employee);
    }

    deleteEmployeeById(id: any) {
        return this.http.delete(this.storeApi + '/deleteEmployee/' + id);
    }

    fetchEmployeeById(id: any) {
        return this.http.get(this.storeApi + '/employeeById/' + id);
    }

    updateEmployee(id: any, employeeObject: any) {
        return this.http.post(this.storeApi + '/updateEmployee/' + id, employeeObject);
    }

    fetchEmailGroups() {
        return this.http.get(this.api + '/fetchEmailGroups');
    }

    setEmployeeId(employeeId: any) {
        this.employeeId = employeeId;
    }

    getEmployeeId() {
        return this.employeeId;
    }

    setStoreId(id: any){
        this.id = id;
    }
    getStoreId() {
        return this.id;
    }

    setTimeZone(timeZoneValue: any) {
        this.timeZoneValue = timeZoneValue;
    }

    getTimeZone() {
        return this.timeZoneValue;
    }
}
