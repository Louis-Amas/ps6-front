import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ConnectionComponent} from './connection/connection.component';
import {StudentHomeComponent} from './student/student-home/student-home.component';
import {StudentFormComponent} from './student/student-form/student-form.component';
import {StudentWishFormComponent} from './student/student-wish-form/student-wish-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'student/:id', component: StudentHomeComponent},
  {path: 'student/:id/form', component: StudentFormComponent},
  {path: 'wishcreation', component: StudentWishFormComponent},
  {path: 'student/:id/wishcreation', component: StudentWishFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
