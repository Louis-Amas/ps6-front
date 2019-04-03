import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatDividerModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatTableModule,
} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { ConnectionComponent } from './connection/connection.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StudentService} from '../services/student/student.service';
import {StudentFormComponent} from './student/student-form/student-form.component';
import {MatSelectModule} from '@angular/material/select';

import { StudentWishFormComponent } from './student/student-wish-form/student-wish-form.component';
import { StudentWishListComponent } from './student/student-wish-list/student-wish-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AuthInterceptor} from '../services/connection/auth.interceptor';
import { TeacherHomeComponent } from './teacher/teacher-home/teacher-home.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentHomeComponent,
    AppComponent,
    HeaderComponent,
    ConnectionComponent,
    HeaderComponent,
    HomeComponent,
    StudentFormComponent,
    HomeComponent,
    StudentWishFormComponent,
    HomeComponent,
    StudentWishListComponent,
    TeacherHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    HttpClientModule,
    MatDividerModule,
    MatSelectModule,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [StudentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
