import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./dashboard/users/users.component";
import {RegisterComponent} from "./dashboard/users/register/register.component";
import {MemberComponent} from "./dashboard/users/member/member.component";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UserpopupComponent} from "./dashboard/users/register/userpopup/userpopup.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterpopupComponent} from "./dashboard/users/register/registerpopup/registerpopup.component";
import {ActivityComponent} from "./dashboard/activity/activity.component";
import {RecipientsComponent} from "./dashboard/activity/recipients/recipients.component";
import {BooksComponent} from "./dashboard/activity/books/books.component";
import {ConsultantComponent} from "./dashboard/consultant/consultant.component";
import {ZoomComponent} from "./user/zoom/zoom.component";
import {ResetpasswordComponent} from "./user/resetpassword/resetpassword.component";

import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    RegisterComponent,
    UserpopupComponent,
    RegisterpopupComponent,
    MemberComponent,
    ConsultantComponent,
    ActivityComponent,
    BooksComponent,
    RecipientsComponent,
    ZoomComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    ClipboardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
