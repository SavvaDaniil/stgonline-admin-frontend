import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { adminGuard } from './guard/adminGuard/admin.guard';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProfilePageComponent } from './page/admin-profile-page/admin-profile-page.component';
import { SubscriptionsPageComponent } from './page/subscriptions-page/subscriptions-page.component';
import { SubscriptionEditPageComponent } from './page/subscription-edit-page/subscription-edit-page.component';
import { TeachersPageComponent } from './page/teachers-page/teachers-page.component';
import { TeacherEditPageComponent } from './page/teacher-edit-page/teacher-edit-page.component';

const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [adminGuard],
    children : [
      {
        path: "",
        component: DashboardPageComponent,
        pathMatch: "full"
      },
      {
        path: "profile",
        component: AdminProfilePageComponent,
        pathMatch: "full"
      },
      {
        path: "subscriptions",
        component: SubscriptionsPageComponent,
        pathMatch: "full"
      },
      {
        path: "subscription/:subscriptionId",
        component: SubscriptionEditPageComponent,
        pathMatch: "full"
      },
      {
        path: "teachers",
        component: TeachersPageComponent,
        pathMatch: "full"
      },
      {
        path: "teacher/:teacherId",
        component: TeacherEditPageComponent,
        pathMatch: "full"
      },
      ...
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
