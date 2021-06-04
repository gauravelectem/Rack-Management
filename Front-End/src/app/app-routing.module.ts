import { AppComponent } from './app.component';
import { ViewTemplateComponent } from './components/view-template/view-template.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './components/add-product/add-forms.component';
import { EditProductComponent } from './components/edit-forms/edit-forms.component';
import { ProductListComponent } from './components/forms-list/forms-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ViewFormDetailsComponent } from './components/view-form-details/view-form-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'template', component: TutorialsListComponent },
  { path: 'template/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'addTemplate', component: EditAppComponent },
  { path: 'edit/:id', component: EditFormComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'addProduct/:id', component: AddProductComponent},
  { path: 'editProduct/:id', component: EditProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:name/:id', component: ProductListComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'products/viewForm/:id', component: ViewFormDetailsComponent },
  { path: 'products/template/:id', component: ViewTemplateComponent },
  { path: 'menu/:id', component: AppComponent },
  { path: 'menu/:name/:id', component: ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }