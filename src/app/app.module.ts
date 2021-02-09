import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { Http, HttpModule, Headers, RequestOptions, Response, ConnectionBackend } from '@angular/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {FaNumPipe} from 'ngx-persian';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardMediaComponent } from './dashboard-media/dashboard-media.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PeopleComponent } from './people/people.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpPageComponent,
    HomeComponent,
    DashboardEventComponent,
    DashboardMediaComponent,
    ErrorDialogComponent,
    PeopleComponent,
    RulesComponent,
   
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    HttpModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
  ,
  entryComponents:[ErrorDialogComponent],
})
export class AppModule { }
