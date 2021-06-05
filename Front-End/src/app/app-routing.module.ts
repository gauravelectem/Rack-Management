import { AppComponent } from './app.component';
import { ViewTemplateComponent } from './components/view-template/view-template.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './components/template-list/tutorials-list.component';
import { TemplateDetailsComponent } from './components/template-details/tutorial-details.component';
import { AddTemplateComponent } from './components/add-template/add-tutorial.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddFormComponent } from './components/add-form/add-forms.component';
import { EditFormsComponent } from './components/edit-forms/edit-forms.component';
import { FormListComponent } from './components/forms-list/forms-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ViewFormDetailsComponent } from './components/view-form-details/view-form-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'template', component: TemplateListComponent },
  { path: 'template/:id', component: TemplateDetailsComponent },
  { path: 'add', component: AddTemplateComponent },
  { path: 'addTemplate', component: EditAppComponent },
  { path: 'edit/:id', component: EditFormComponent },
  { path: 'edit/:name/:id', component: EditFormComponent},
  { path: 'addProduct', component: AddFormComponent },
  { path: 'addProduct/:id', component: AddFormComponent},
  { path: 'editProduct/:id', component: EditFormComponent },
  { path: 'products', component: FormListComponent },
  { path: 'products/:name/:id', component: FormListComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'products/viewForm/:id', component: ViewFormDetailsComponent },
  { path: 'products/template/:id', component: ViewTemplateComponent },
  { path: 'menu/:id', component: AppComponent },
  { path: 'menu/:name/:id', component: FormListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
