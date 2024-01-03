import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseEditTabCourseDaysComponent } from 'src/app/component/course/course-edit-tab-course-days/course-edit-tab-course-days.component';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { CourseEditDTO } from 'src/app/dto/course/CourseEditDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { CourseService } from 'src/app/service/course-service/course.service';
import { constant } from 'src/app/util/GlobalVariables';
import { TeacherMicroViewModel } from 'src/app/viewModel/teacher/TeacherMicroViewModel';

@Component({
  standalone: true,
  selector: 'app-course-edit-page',
  templateUrl: './course-edit-page.component.html',
  styleUrls: ['./course-edit-page.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent, CourseEditTabCourseDaysComponent]
})
export class CourseEditPageComponent 
{
  @ViewChild('btnModalCoursePosterDeleteClose') btnModalCoursePosterDeleteClose!: ElementRef<HTMLElement>;
  @ViewChild("courseEditTabCourseDays") courseEditTabCourseDays!: CourseEditTabCourseDaysComponent;

  public courseId: number | undefined;
  private subscription: Subscription;
  public courseForm: FormGroup;
  public readonly baseDomain: string = constant.baseDomain;

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

  public warning: string = "";
  readonly setWarning = (value: string): void =>
  {
    this.warning = value;
  }
  public clearWarning(): void
  {
    this.setWarning("");
    this.setSuccess("");
  }

  public success: string = "";
  readonly setSuccess = (value: string): void =>
  {
    this.success = value;
  }

  private posterFile: File | null = null;
  public isPosterDeleting: boolean = false;
  readonly setIsPosterDeleting = (value: boolean): void =>
  {
    this.isPosterDeleting = value;
  }
  public isListCourseDaysAlreadyInit: boolean = false;

  public setCourseEditViewModel = (courseEditDTOViewModel: CourseEditDTO): void => {

    const teacherMicroViewModels: Array<TeacherMicroViewModel> = new Array<TeacherMicroViewModel>();
    const notChoosenOption: any = {
      id: 0,
      name: "- Не выбрано"
    }

    teacherMicroViewModels.push(notChoosenOption);
    teacherMicroViewModels.push(...courseEditDTOViewModel.teacherMicroViewModels);

    this.courseForm.setValue({
      id: courseEditDTOViewModel.id,
      meta_keywords: courseEditDTOViewModel.meta_keywords,
      meta_description: courseEditDTOViewModel.meta_description,
      name: courseEditDTOViewModel.name,
      active: courseEditDTOViewModel.active,
      price: courseEditDTOViewModel.price,
      price_fake: courseEditDTOViewModel.price_fake,
      price_with_chat: courseEditDTOViewModel.price_with_chat,
      price_with_chat_fake: courseEditDTOViewModel.price_with_chat_fake,
      days: courseEditDTOViewModel.days,
      description: courseEditDTOViewModel.description,
      status_of_chat_none_0_homework_1_and_chat_2: courseEditDTOViewModel.status_of_chat_none_0_homework_1_and_chat_2,
      status_of_could_be_purchased_blank0_only_chat2_blank_or_chat3: courseEditDTOViewModel.status_of_could_be_purchased_blank0_only_chat2_blank_or_chat3,

      order_in_list: courseEditDTOViewModel.order_in_list,
      poster_src: courseEditDTOViewModel.poster_src,
      teaser_src: courseEditDTOViewModel.teaser_src,

      teacher_id: courseEditDTOViewModel.teacher_id,

      teacherMicroViewModels: teacherMicroViewModels
    });
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private adminMiddleware: AdminMiddlewareService,
    private courseService: CourseService,
  ){
    this.subscription = this.activateRoute.params.subscribe(params => {
      //ToDo: maybe check for Number???
      this.courseId = params["courseId"]
    });
    document.title = "Курс " + (typeof(this.courseId) !== "undefined" ? this.courseId : "") + " | STGONLINE - Панель администратора";
    this.courseForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      meta_keywords: new FormControl(""),
      meta_description: new FormControl(""),
      name: new FormControl(""),
      active: new FormControl(0),
      price: new FormControl(0),
      price_fake: new FormControl(0),
      price_with_chat: new FormControl(0),
      price_with_chat_fake: new FormControl(0),
      days: new FormControl(0),
      description: new FormControl(""),
      status_of_chat_none_0_homework_1_and_chat_2: new FormControl(0),
      status_of_could_be_purchased_blank0_only_chat2_blank_or_chat3: new FormControl(0),

      order_in_list: new FormControl(0),
      poster_src: new FormControl(""),
      teaser_src: new FormControl(""),

      teacher_id: new FormControl(0),

      teacherMicroViewModels: new FormControl(Array<TeacherMicroViewModel>)
    });
  }

  async ngOnInit(): Promise<void>
  {
    await this.getForEdit();
  }

  public async getForEdit(): Promise<void> 
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    if(typeof(this.courseId) === "undefined")
    {
      console.log("courseId is undefined");
      return;
    }

    await this.courseService.getEdit(
      this.courseId!,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setCourseEditViewModel
    );
  }


  public setPoster(event: any): void
  {
    const file: File | null = event.target.files[0];

    if(file)
    {
      this.posterFile = file;
    }
  }

  public async posterDelete(): Promise<void>
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.courseService.posterDelete(
      this.courseId!,
      jwt,
      this.setIsPosterDeleting,
      this.setWarning,
      this.posterDeleteSuccessfully
    );
  }

  public posterDeleteSuccessfully = (): void => {
    this.btnModalCoursePosterDeleteClose.nativeElement.click();
    this.getForEdit();
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

    await this.courseService.update(
      this.courseForm.value.id,
      this.courseForm.value.meta_keywords,
      this.courseForm.value.meta_description,
      this.courseForm.value.name,
      this.courseForm.value.days,
      this.courseForm.value.price,
      this.courseForm.value.price_fake,
      this.courseForm.value.price_with_chat,
      this.courseForm.value.price_with_chat_fake,
      this.courseForm.value.description,
      this.courseForm.value.active,
      this.courseForm.value.status_of_chat_none_0_homework_1_and_chat_2,
      this.courseForm.value.status_of_could_be_purchased_blank0_only_chat2_blank_or_chat3,
  
      this.courseForm.value.order_in_list,
      this.posterFile,
  
      this.courseForm.value.teacher_id,

      jwt,
      this.setIsSaving,
      this.setWarning,
      this.updateSuccessfully
    );
  }

  public updateSuccessfully = (): void => {
    if(this.posterFile !== null)
    {
      this.getForEdit();
      this.posterFile = null;
    } else
    {
      this.setSuccess("Успешно сохранено");
    }
  }


  public async initListCourseDays(): Promise<void>
  {
    if(this.isListCourseDaysAlreadyInit)
    {
      return;
    }
    await this.courseEditTabCourseDays.listCourseDays();
    this.isListCourseDaysAlreadyInit = true;
  }

}
