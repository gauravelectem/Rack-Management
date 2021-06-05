import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { DndModule } from 'ngx-drag-drop';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { AddTemplateComponent } from './components/add-template/add-tutorial.component';
import { TemplateDetailsComponent } from './components/template-details/tutorial-details.component';
import { TemplateListComponent } from './components/template-list/tutorials-list.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddFormComponent } from './components/add-form/add-forms.component';
import { EditFormsComponent } from './components/edit-forms/edit-forms.component';
import { FormListComponent } from './components/forms-list/forms-list.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ViewTemplateComponent } from './components/view-template/view-template.component';
import { ViewFormDetailsComponent } from './components/view-form-details/view-form-details.component';
const appRoutes: Routes = [
  // { path: '', component: EditAppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditAppComponent,
    AddTemplateComponent,
    TemplateDetailsComponent,
    TemplateListComponent,
    EditFormComponent,
    AddFormComponent,
    EditFormsComponent,
 FormListComponent,
 ViewTemplateComponent,
 ViewFormDetailsComponent,

  ],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    SweetAlert2Module.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DndModule,
    MatSliderModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
