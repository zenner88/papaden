import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./dashboard/users/users.component";
import {RegisterComponent} from "./dashboard/users/register/register.component";
import {MemberComponent} from "./dashboard/users/member/member.component";
import {ConsultantComponent} from "./dashboard/consultant/consultant.component";
import {ActivityComponent} from "./dashboard/activity/activity.component";
import {BooksComponent} from "./dashboard/activity/books/books.component";
import {RecipientsComponent} from "./dashboard/activity/recipients/recipients.component";
import {YoutubeComponent} from "./dashboard/youtube/youtube.component";
import {ZoomComponent} from "./user/zoom/zoom.component";
import {ResetpasswordComponent} from "./user/resetpassword/resetpassword.component";
import {MainComponent} from "./user/main/main.component";
import {LoginComponent} from "./user/login/login.component";
import {BannerComponent} from "./dashboard/banner/banner.component";
import {PrivacyComponent} from "./user/privacy/privacy.component";
import {ResetpasswordformComponent} from "./user/resetpasswordform/resetpasswordform.component";
import {RatingComponent} from "./user/rating/rating.component";

const routes: Routes = [
  {
    path: 'main',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'register',
            component: RegisterComponent
          },
          {
            path: 'member',
            component: MemberComponent
          },
        ]
      },
      {
        path: 'consultant',
        component: ConsultantComponent
      },
      {
        path: 'youtube',
        component: YoutubeComponent
      },
      {
        path: 'banner',
        component: BannerComponent
      },
      {
        path: 'activity',
        component: ActivityComponent,
        children: [
          {
            path: 'books',
            component: BooksComponent
          },
          {
            path: 'recipients',
            component: RecipientsComponent
          }
        ]
      }
    ]
  },
  {
    path: 'user/zoom',
    component: ZoomComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'user/resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordformComponent
  },
  {
    path: 'rating',
    component: RatingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
