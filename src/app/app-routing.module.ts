import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ConnectionComponent} from './connection/connection.component';
import {StudentHomeComponent} from './student-home/student-home.component';
import {StudentWishFormComponent} from './student-wish-form/student-wish-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'student', component: ConnectionComponent},
  {path: 'student/:id', component: StudentHomeComponent},
  {path: 'teacher', component: ConnectionComponent},
  {path: 'bri', component: ConnectionComponent},
  {path: 'student/:id/wishcreation', component: StudentWishFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
