import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmailGroupComponent } from './email-group/email-group.component' ;
import { EmailGroupEditComponent } from './email-group-edit/email-group-edit.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { StoreListingComponent } from './store-listing/store-listing.component'
;
import { EditStoreComponent } from './edit-store/edit-store.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgSelectModule,
        AngularFileUploaderModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        EmployeeComponent,
        EmployeeEditComponent ,
        EmailGroupComponent ,
        EmailGroupEditComponent,
        EditStoreComponent,
        StoreListingComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
