import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentHomeComponent} from './student-home/student-home.component';

const routes: Routes = [
  {path: 'student', component: StudentHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
