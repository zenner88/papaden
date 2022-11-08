import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import {PrivacyComponent} from "./user/privacy/privacy.component";
import {ResetpasswordComponent} from "./user/resetpassword/resetpassword.component";
import {ResetpasswordformComponent} from "./user/resetpasswordform/resetpasswordform.component";
import {MainComponent} from "./user/main/main.component";
import {LoginComponent} from "./user/login/login.component";
import {MemberpopupComponent} from "./dashboard/users/member/memberpopup/memberpopup.component";
import {RecipientspopupComponent} from "./dashboard/activity/recipients/recipientspopup/recipientspopup.component";
import {BookspopupComponent} from "./dashboard/activity/books/bookspopup/bookspopup.component";
import {YoutubeComponent} from "./dashboard/youtube/youtube.component";
import {BannerComponent} from "./dashboard/banner/banner.component";
import {RatingComponent} from "./user/rating/rating.component";
import {DeleteuserComponent} from "./user/deleteuser/deleteuser.component";

import {ClipboardModule} from '@angular/cdk/clipboard';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SafePipe} from "./safe.pipe";
import { OktaAuth } from '@okta/okta-auth-js';

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
    ResetpasswordComponent,
    MainComponent,
    LoginComponent,
    MemberpopupComponent,
    YoutubeComponent,
    BannerComponent,
    SafePipe,
    PrivacyComponent,
    ResetpasswordformComponent,
    RecipientspopupComponent,
    BookspopupComponent,
    RatingComponent,
    DeleteuserComponent
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
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
