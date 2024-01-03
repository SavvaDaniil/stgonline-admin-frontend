import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { CourseService } from 'src/app/service/course-service/course.service';
import { CourseLessonInfoViewModel } from 'src/app/viewModel/course/CourseLessonInfoViewModel';
import { LessonMicroViewModel } from 'src/app/viewModel/lesson/LessonMicroViewModel';

@Component({
  standalone: true,
  selector: 'app-course-edit-tab-course-lesson-edit',
  templateUrl: './course-edit-tab-course-lesson-edit.component.html',
  styleUrls: ['./course-edit-tab-course-lesson-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CourseEditTabCourseLessonEditComponent 
{
  @Input() public courseLessonInfoViewModel: CourseLessonInfoViewModel | null = null;
  @Input() public course_lesson_index: number = 0;
  @Input() public lessonMicroViewModels: Array<LessonMicroViewModel> | null = []

  @Output() public courseLessonDeletePrepareEmit = new EventEmitter();

  public courseLessonForm: FormGroup;

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
    this.courseLessonForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      lesson_id: new FormControl(0),
      homework_status: new FormControl(0),
      homework_text: new FormControl("")
    });
  }

  public ngAfterViewInit(): void
  {
    if(this.courseLessonInfoViewModel !== null)
    {
      this.courseLessonForm.setValue({
        id: this.courseLessonInfoViewModel.id,
        lesson_id: this.courseLessonInfoViewModel.course_lesson_id,
        homework_status: this.courseLessonInfoViewModel.homework_status,
        homework_text: this.courseLessonInfoViewModel.homework_text
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

    await this.courseService.courseLessonUpdate(
      this.courseLessonForm.value.id,
      this.courseLessonForm.value.lesson_id,
      this.courseLessonForm.value.homework_status,
      this.courseLessonForm.value.homework_text,
      jwt,
      this.setIsLoading,
      this.setWarning,
      this.updateSuccessfully
    )
  }

  readonly updateSuccessfully = (): void =>{
    this.setSuccess("Успешно сохранено");
  }

  public courseLessonDeletePrepare(): void
  {
    this.courseLessonDeletePrepareEmit.emit(this.courseLessonForm.value.id);
  }

}
