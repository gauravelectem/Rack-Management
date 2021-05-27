import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { DndModule } from 'ngx-drag-drop';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { StoreListComponent } from './components/store-list/store-list.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
const appRoutes: Routes = [
  //{ path: '', component: EditAppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EditAppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    EditFormComponent,
    AddStoreComponent,
    StoreListComponent,
    EditStoreComponent,
    
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    SweetAlert2Module.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DndModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
