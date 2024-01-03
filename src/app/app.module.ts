import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AdminProfilePageComponent } from './page/admin-profile-page/admin-profile-page.component';
import { SystemLoadingPageComponent } from './component/system-loading-page/system-loading-page.component';
import { SystemErrorPageComponent } from './component/system-error-page/system-error-page.component';
import { SubscriptionsPageComponent } from './page/subscriptions-page/subscriptions-page.component';
import { SubscriptionEditPageComponent } from './page/subscription-edit-page/subscription-edit-page.component';
import { TeachersPageComponent } from './page/teachers-page/teachers-page.component';
import { TeacherEditPageComponent } from './page/teacher-edit-page/teacher-edit-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LessonsPageComponent } from './page/lessons-page/lessons-page.component';
import { LessonEditPageComponent } from './page/lesson-edit-page/lesson-edit-page.component';
import { CoursesPageComponent } from './page/courses-page/courses-page.component';
import { CourseEditPageComponent } from './page/course-edit-page/course-edit-page.component';
import { CourseEditTabCourseDaysComponent } from './component/course/course-edit-tab-course-days/course-edit-tab-course-days.component';
import { CourseEditTabCourseDayEditComponent } from './component/course/course-edit-tab-course-day-edit/course-edit-tab-course-day-edit.component';
import { CourseEditTabCourseLessonEditComponent } from './component/course/course-edit-tab-course-lesson-edit/course-edit-tab-course-lesson-edit.component';
import { StatementsPageComponent } from './page/statements-page/statements-page.component';
import { StatementEditPageComponent } from './page/statement-edit-page/statement-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    TeachersPageComponent,
    LessonsPageComponent,
    CoursesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SystemLoadingPageComponent,
    SystemErrorPageComponent,
    DashboardPageComponent,
    LoginPageComponent,
    AdminProfilePageComponent,
    SubscriptionsPageComponent,
    SubscriptionEditPageComponent,
    TeacherEditPageComponent,
    LessonEditPageComponent,
    CourseEditPageComponent,
    CourseEditTabCourseDaysComponent,
    CourseEditTabCourseDayEditComponent,
    CourseEditTabCourseLessonEditComponent,
    StatementsPageComponent,
    StatementEditPageComponent,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
