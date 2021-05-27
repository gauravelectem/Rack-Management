import { AddStoreComponent } from './components/add-store/add-store.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { StoreListComponent } from './components/store-list/store-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'addTemplate', component: EditAppComponent },
  { path: 'edit/:id', component: EditFormComponent },
  { path: 'addStore', component: AddStoreComponent },
  { path: 'addStore/storeList', component: StoreListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
