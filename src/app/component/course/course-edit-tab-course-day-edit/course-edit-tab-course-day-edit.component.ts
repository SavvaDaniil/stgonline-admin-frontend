import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseDayInfoViewModel } from 'src/app/viewModel/course/CourseDayInfoViewModel';
import { LessonMicroViewModel } from 'src/app/viewModel/lesson/LessonMicroViewModel';
import { CourseEditTabCourseLessonEditComponent } from '../course-edit-tab-course-lesson-edit/course-edit-tab-course-lesson-edit.component';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { CourseService } from 'src/app/service/course-service/course.service';

@Component({
  standalone: true,
  selector: 'app-course-edit-tab-course-day-edit',
  templateUrl: './course-edit-tab-course-day-edit.component.html',
  styleUrls: ['./course-edit-tab-course-day-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule, CourseEditTabCourseLessonEditComponent]
})
export class CourseEditTabCourseDayEditComponent 
{
  @Input() public courseDayInfoViewModel: CourseDayInfoViewModel | null = null;
  @Input() public course_day_index: number = 0;
  @Input() public lessonMicroViewModels: Array<LessonMicroViewModel> | null = []

  @Output() public courseDayDeletePrepareEmit = new EventEmitter<number>();
  @Output() public courseLessonAddEmit = new EventEmitter();
  @Output() public courseLessonDeletePrepareEmit = new EventEmitter();

  public courseDayForm: FormGroup;

  public isLoading: boolean = false;
  readonly setIsLoading = (value: boolean): void =>
  {
    this.isLoading = value;
  }

  public warning: string = "";
  readonly setWarning = (value: string): void =>
  {
    this.warning = value;
  }

  public success: string = "";
  readonly setSuccess = (value: string): void =>
  {
    this.success = value;
  }

  public clearWarning(): void
  {
    this.setWarning("");
    this.setSuccess("");
  }

  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private courseService: CourseService
  )
  {
    this.courseDayForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl("")
    });
  }

  public ngAfterViewInit(): void
  {
    if(this.courseDayInfoViewModel !== null)
    {
      this.courseDayForm.setValue({
        id: this.courseDayInfoViewModel.id,
        name: this.courseDayInfoViewModel.name
      });
    }
  }

  public async update(): Promise<void>
  {
    if(this.isLoading)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.courseDayUpdate(
      this.courseDayForm.value.id,
      this.courseDayForm.value.name,
      jwt,
      this.setIsLoading,
      this.setWarning,
      this.updateSuccessfully
    )
  }

  readonly updateSuccessfully = (): void =>{
    this.setSuccess("Успешно сохранено");
  }

  public courseLessonAdd(): void
  {
    this.courseLessonAddEmit.emit(this.courseDayForm.value.id);
  }

  public courseDayDeletePrepare(): void
  {
    this.courseDayDeletePrepareEmit.emit(this.courseDayForm.value.id);
  }

  public courseLessonDeletePrepare(courseLessonId: number): void
  {
    this.courseLessonDeletePrepareEmit.emit(courseLessonId);
  }
}
