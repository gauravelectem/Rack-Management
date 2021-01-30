import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from './service/Employee.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    formSection!: FormGroup;

    constructor(private employeeService: EmployeeService, ) {}
selectedTimeZOne: any;
timezones: any = [  'GMT-11:00#Midway Island, Samoa',
                    'GMT-10:00#Hawaii',
                    'GMT-9:30#Taiohae',
                    'GMT-9:00#Alaska',
                    'GMT-8:00#Pacific Time (US &amp; Canada)',
                    'GMT-7:00#Mountain Time (US &amp; Canada)',
                    'GMT-6:00#Central Time (US &amp; Canada), Mexico City',
                    'GMT-5:00#Eastern Time (US &amp; Canada), Bogota, Lima',
                    'GMT-4:30#Caracas',
                    'GMT-4:00#Atlantic Time (Canada), Caracas, La Paz',
                    'GMT-3:30#Newfoundland',
                    'GMT+5:30#Bombay, Calcutta, Madras, New Delhi'];

      selectTimeZone(timezone: any){
        this.employeeService.setTimeZone(timezone);
      }

}
