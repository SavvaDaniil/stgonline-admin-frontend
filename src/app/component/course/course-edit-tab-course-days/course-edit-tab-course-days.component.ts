import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SystemLoadingPageComponent } from '../../system-loading-page/system-loading-page.component';
import { SystemErrorPageComponent } from '../../system-error-page/system-error-page.component';
import { CourseDayInfoViewModel } from 'src/app/viewModel/course/CourseDayInfoViewModel';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { CourseService } from 'src/app/service/course-service/course.service';
import { CommonModule } from '@angular/common';
import { LessonMicroViewModel } from 'src/app/viewModel/lesson/LessonMicroViewModel';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseEditTabCourseDayEditComponent } from '../course-edit-tab-course-day-edit/course-edit-tab-course-day-edit.component';

@Component({
  standalone: true,
  selector: 'app-course-edit-tab-course-days',
  templateUrl: './course-edit-tab-course-days.component.html',
  styleUrls: ['./course-edit-tab-course-days.component.css'],
  imports: [CommonModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent, CourseEditTabCourseDayEditComponent]
})
export class CourseEditTabCourseDaysComponent 
{
  @Input() public courseId: number = 0;
  @ViewChild('btnModalDayDeleteOpen') btnModalDayDeleteOpen!: ElementRef<HTMLElement>;
  @ViewChild('btnModalDayDeleteClose') btnModalDayDeleteClose!: ElementRef<HTMLElement>;
  @ViewChild('btnModalCourseLessonDeleteOpen') btnModalCourseLessonDeleteOpen!: ElementRef<HTMLElement>;
  @ViewChild('btnModalCourseLessonDeleteClose') btnModalCourseLessonDeleteClose!: ElementRef<HTMLElement>;

  public isLoading: boolean = false;
  readonly setIsLoading = (value: boolean): void =>
  {
    this.isLoading = value;
  }

  public isError: boolean = false;
  readonly setIsError = (value: boolean): void =>
  {
    this.isError = value;
  }

  public isSaving: boolean = false;
  readonly setIsSaving = (value: boolean): void =>
  {
    this.isSaving = value;
  }

  public courseDayInfoViewModels: Array<CourseDayInfoViewModel> = new Array<CourseDayInfoViewModel>();
  public setCourseDayInfoViewModels = (courseDayInfoViewModels: Array<CourseDayInfoViewModel>): void => {
    this.courseDayInfoViewModels = courseDayInfoViewModels;
  }

  public lessonMicroViewModels: Array<LessonMicroViewModel> | null = []
  public setLessonMicroViewModels = (lessonMicroViewModels: Array<LessonMicroViewModel>): void => {
    this.lessonMicroViewModels = Array<LessonMicroViewModel>();
    const lessonMicroViewModelNotSelected: any = {
      id: 0,
      name: "не выбрано"
    }
    this.lessonMicroViewModels.push(lessonMicroViewModelNotSelected);
    this.lessonMicroViewModels.push(...lessonMicroViewModels);
  }

  private courseDayIdForDelete: number = 0;
  private courseLessonIdForDelete: number = 0;
  public isCourseDayOrCourseLessonAddOrDeleting: boolean = false;
  readonly setIsCourseDayOrCourseLessonAddOrDeleting = (value: boolean): void =>
  {
    this.isCourseDayOrCourseLessonAddOrDeleting = value;
  }

  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private courseService: CourseService
  ){
  }

  readonly listCourseDays = async(): Promise<void> => {
    if(this.isLoading)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.listCourseDays(
      this.courseId!,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setCourseDayInfoViewModels,
      this.setLessonMicroViewModels
    )
  }

  public async courseDayAdd(): Promise<void>
  {
    if(this.isCourseDayOrCourseLessonAddOrDeleting)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.courseDayAdd(
      this.courseId,
      jwt,
      this.setIsCourseDayOrCourseLessonAddOrDeleting,
      this.setIsError,
      this.courseDayAndCourseLessonAddOrDeleteSuccessful
    )
  }

  readonly courseDayDeletePrepare = (courseDayId: number): void => {
    this.courseDayIdForDelete = courseDayId;
    this.btnModalDayDeleteOpen.nativeElement.click();
  }
  public async courseDayDelete(): Promise<void>
  {
    if(this.isCourseDayOrCourseLessonAddOrDeleting)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.courseDayDelete(
      this.courseDayIdForDelete,
      jwt,
      this.setIsCourseDayOrCourseLessonAddOrDeleting,
      this.courseDayAndCourseLessonAddOrDeleteSuccessful
    )
  }

  public async courseLessonAdd(courseDayId: number): Promise<void>
  {
    if(this.isCourseDayOrCourseLessonAddOrDeleting)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.courseLessonAdd(
      this.courseId,
      courseDayId,
      jwt,
      this.setIsCourseDayOrCourseLessonAddOrDeleting,
      this.setIsError,
      this.courseDayAndCourseLessonAddOrDeleteSuccessful
    )
  }

  readonly courseLessonDeletePrepare = (courseLessonId: number): void => {
    this.courseLessonIdForDelete = courseLessonId;
    console.log("courseLessonId: " + courseLessonId);
    //this.btnModalCourseLessonDeleteOpen.nativeElement.click();
  }
  public async courseLessonDelete(): Promise<void>
  {
    if(this.isCourseDayOrCourseLessonAddOrDeleting)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.courseLessonDelete(
      this.courseLessonIdForDelete,
      jwt,
      this.setIsCourseDayOrCourseLessonAddOrDeleting,
      this.courseDayAndCourseLessonAddOrDeleteSuccessful
    )
  }

  readonly courseDayAndCourseLessonAddOrDeleteSuccessful = async(): Promise<void> => {
    this.btnModalDayDeleteClose.nativeElement.click();
    this.btnModalCourseLessonDeleteClose.nativeElement.click();
    await this.listCourseDays();
  }

}
