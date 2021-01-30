import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmailGroupComponent } from './email-group/email-group.component';
import { EmailGroupEditComponent } from './email-group-edit/email-group-edit.component';
import { StoreListingComponent } from './store-listing/store-listing.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', loadChildren: usersModule },
    { path: 'employees', component: EmployeeComponent},
    { path: 'emailGroup', component: EmailGroupComponent},
    { path: 'editEmployee', component: EmployeeEditComponent},
    { path: 'editEmailGroup', component: EmailGroupEditComponent},
    { path: 'stores', component: StoreListingComponent},
    { path: 'editStore', component: EditStoreComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
