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
  MatDialogModule, MatSidenavModule, MatBadgeModule,
  MatSortModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule,
  MatSnackBarModule
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
import { TeacherStudentDetailsComponent } from './teacher/teacher-student-details/teacher-student-details.component';
import {TeacherListUniversitiesComponent} from './teacher/teacher-home/teacher-list-universities/teacher-list-universities.component';
import {TeacherUniversityDetailsComponent} from './teacher/teacher-home/teacher-university-details/teacher-university-details.component';
import { AddCourseOverviewDialogComponent } from './commons/add-course-overview-dialog/add-course-overview-dialog';
import { WishOverviewDialogComponent } from './teacher/wish-overview-dialog/wish-overview-dialog.component';
import { BriHomeComponent } from './bri/bri-home/bri-home.component';
import { BriFileInProcessComponent } from './bri/bri-home/bri-file-in-process/bri-file-in-process.component';
import { BriOverviewComponent } from './bri/bri-home/bri-overview/bri-overview.component';
import { FilterBarBriComponent } from './bri/bri-home/filter-bar-bri/filter-bar-bri.component';
import { StudentMessagesComponent } from './student/student-messages/student-messages.component';
import { BriAppointmentComponent } from './bri/bri-home/bri-appointment/bri-appointment.component';
import { StudentDetailsComponent } from './bri/bri-home/student-details/student-details.component';
// tslint:disable-next-line:max-line-length
import { BriAppointmentCreationDialogComponent} from './bri/bri-home/bri-appointment-creation-dialog/bri-appointment-creation-dialog.component';
import { FooterComponent } from './footer/footer.component';
// tslint:disable-next-line:max-line-length
import { UpdateWishOverviewDialogComponent } from './student/student-wish-list/update-wish-overview-dialog/update-wish-overview-dialog.component';
import { StudentAppointmentComponent } from './student/student-home/student-appointment/student-appointment.component';
import { StudentAppointmentDialogComponent } from './student/student-home/student-appointment-dialog/student-appointment-dialog.component';
import { StudentInfoComponent } from './commons/student-info/student-info.component';
import { StudentInfoWishesComponent } from './commons/student-info-wishes/student-info-wishes.component';
import { StudentFormDialogComponent } from './student/student-form-dialog/student-form-dialog.component';
import { BackHeaderComponent } from './commons/back-header/back-header.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { WishesTableComponent } from './commons/wishes-table/wishes-table.component';
import {NotesTableComponent} from './commons/notes-table/notes-table.component';

import { Observable } from 'rxjs';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/'
};

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
    StudentHeaderComponent,
    TeacherStudentDetailsComponent,
    TeacherListUniversitiesComponent,
    TeacherUniversityDetailsComponent,
    WishOverviewDialogComponent,
    AddCourseOverviewDialogComponent,
    StudentMessagesComponent,
    BriHomeComponent,
    BriFileInProcessComponent,
    BriOverviewComponent,
    FilterBarBriComponent,
    StudentDetailsComponent,
    BriAppointmentComponent,
    BriAppointmentCreationDialogComponent,
    UpdateWishOverviewDialogComponent,
    FooterComponent,
    StudentAppointmentComponent,
    StudentAppointmentDialogComponent,
    FooterComponent,
    StudentInfoComponent,
    StudentInfoWishesComponent,
    StudentFormDialogComponent,
    BackHeaderComponent,
    ImageSliderComponent,
    BackHeaderComponent,
    WishesTableComponent,
    NotesTableComponent
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
    MatBadgeModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSnackBarModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [StudentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [StudentOverviewDialogComponent, AddCourseOverviewDialogComponent, WishOverviewDialogComponent,
    BriAppointmentCreationDialogComponent, UpdateWishOverviewDialogComponent, StudentAppointmentDialogComponent,
    StudentFormDialogComponent]
})
export class AppModule { }
