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

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
