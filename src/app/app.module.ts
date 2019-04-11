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
  MatCheckboxModule,
  MatProgressBarModule,
  MatTableModule,
  MatTabsModule,
  MatDividerModule, MatExpansionModule,
  MatDialogModule, MatSidenavModule
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
import { FormComponent } from './form/form.component';
import { TeacherFileInProcessComponent } from './teacher/teacher-home/teacher-file-in-process/teacher-file-in-process.component';
import { FilterBarComponent } from './teacher/teacher-home/filter-bar/filter-bar.component';
import { TeacherFileProcessedComponent } from './teacher/teacher-home/teacher-file-processed/teacher-file-processed.component';
import { StudentOverviewDialogComponent } from './student/student-overview-dialog/student-overview-dialog.component';
import { StudentHeaderComponent } from './student/student-header/student-header.component';

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
    TeacherHomeComponent,
    FormComponent,
    TeacherHomeComponent,
    TeacherFileInProcessComponent,
    FilterBarComponent,
    TeacherFileProcessedComponent,
    StudentOverviewDialogComponent,
    StudentHeaderComponent
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
    MatTabsModule,
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
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
  ],
  providers: [StudentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [StudentOverviewDialogComponent]
})
export class AppModule { }
