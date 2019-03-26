import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { StudentHomeComponent } from './student-home/student-home.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule, MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import { ConnectionComponent } from './connection/connection.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StudentService} from '../services/student/student.service';
import { StudentWishListComponent } from './student-wish-list/student-wish-list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    StudentHomeComponent,
    AppComponent,
    HeaderComponent,
    ConnectionComponent,
    HeaderComponent,
    HomeComponent,
    StudentWishListComponent
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
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
