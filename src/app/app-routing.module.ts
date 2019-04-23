import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ConnectionComponent} from './connection/connection.component';
import {StudentHomeComponent} from './student/student-home/student-home.component';
import {StudentFormComponent} from './student/student-form/student-form.component';
import {StudentWishFormComponent} from './student/student-wish-form/student-wish-form.component';
import {TeacherHomeComponent} from './teacher/teacher-home/teacher-home.component';
import {TeacherStudentDetailsComponent} from './teacher/teacher-student-details/teacher-student-details.component';
import {TeacherUniversityDetailsComponent} from './teacher/teacher-home/teacher-university-details/teacher-university-details.component';
import {BriHomeComponent} from './bri/bri-home/bri-home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'student/:id', component: StudentHomeComponent},
  {path: 'student/:id/form', component: StudentFormComponent},
  {path: 'wishcreation', component: StudentWishFormComponent},
  {path: 'student/:id/wishcreation', component: StudentWishFormComponent},
  {path: 'teacher/:id', component: TeacherHomeComponent},
  {path: 'teacher/:id/student/:stuId', component: TeacherStudentDetailsComponent},
  {path: 'teacher/:id/university/:univId', component: TeacherUniversityDetailsComponent},
  {path: 'bri/:id', component: BriHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
