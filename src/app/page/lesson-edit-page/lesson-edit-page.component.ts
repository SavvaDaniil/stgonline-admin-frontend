import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { LessonEditDTO } from 'src/app/dto/lesson/LessonEditDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { LessonService } from 'src/app/service/lesson-service/lesson.service';
import { constant } from 'src/app/util/GlobalVariables';
import { LessonTypeMicroViewModel } from 'src/app/viewModel/lesson_type/LessonTypeMicroViewModel';
import { LevelMicroViewModel } from 'src/app/viewModel/level/LevelMicroViewModel';
import { StyleMicroViewModel } from 'src/app/viewModel/style/StyleMicroViewModel';
import { TeacherMicroViewModel } from 'src/app/viewModel/teacher/TeacherMicroViewModel';

@Component({
  standalone: true,
  selector: 'app-lesson-edit-page',
  templateUrl: './lesson-edit-page.component.html',
  styleUrls: ['./lesson-edit-page.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class LessonEditPageComponent 
{
  @ViewChild('btnModalLessonPosterDeleteClose') btnModalLessonPosterDeleteClose!: ElementRef<HTMLElement>;

  private lessonId: number | undefined;
  private subscription: Subscription;
  public lessonForm: FormGroup;
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

  public setLessonEditViewModel = (lessonEditDTOViewModel: LessonEditDTO): void => {

    const lessonTypeMicroViewModels: Array<LessonTypeMicroViewModel> = new Array<LessonTypeMicroViewModel>();
    const teacherMicroViewModels: Array<TeacherMicroViewModel> = new Array<TeacherMicroViewModel>();
    const styleMicroViewModels: Array<StyleMicroViewModel> = new Array<StyleMicroViewModel>();
    const notChoosenOption: any = {
      id: 0,
      name: "- Не выбрано"
    }
    lessonTypeMicroViewModels.push(notChoosenOption);
    lessonTypeMicroViewModels.push(...lessonEditDTOViewModel.lessonTypeMicroViewModels);

    teacherMicroViewModels.push(notChoosenOption);
    teacherMicroViewModels.push(...lessonEditDTOViewModel.teacherMicroViewModels);

    styleMicroViewModels.push(notChoosenOption);
    styleMicroViewModels.push(...lessonEditDTOViewModel.styleMicroViewModels);

    this.lessonForm.setValue({
      id: lessonEditDTOViewModel.id,
      meta_keywords: lessonEditDTOViewModel.meta_keywords,
      meta_description: lessonEditDTOViewModel.meta_description,
      name: lessonEditDTOViewModel.name,
      short_name: lessonEditDTOViewModel.short_name,
      music_name: lessonEditDTOViewModel.music_name,
      poster_src: lessonEditDTOViewModel.poster_src,
      teaser_src: lessonEditDTOViewModel.teaser_src,
      demo_src: lessonEditDTOViewModel.demo_src,
      active: lessonEditDTOViewModel.active,
      is_visible: lessonEditDTOViewModel.is_visible,
  
      days: lessonEditDTOViewModel.days,
      price: lessonEditDTOViewModel.price,
  
      video_hash_path: lessonEditDTOViewModel.video_hash_path,
      video_duration:lessonEditDTOViewModel.video_duration,
  
      is_ai_available: lessonEditDTOViewModel.is_ai_available,
  
      level_id: lessonEditDTOViewModel.level_id,
      lesson_type_id: lessonEditDTOViewModel.lesson_type_id,
      teacher_id: lessonEditDTOViewModel.teacher_id,
      style_id: lessonEditDTOViewModel.style_id,
  
      levelMicroViewModels: lessonEditDTOViewModel.levelMicroViewModels,
      lessonTypeMicroViewModels: lessonTypeMicroViewModels,
      teacherMicroViewModels: teacherMicroViewModels,
      styleMicroViewModels: styleMicroViewModels
    });
  }

  private posterFile: File | null = null;
  public isPosterDeleting: boolean = false;
  readonly setIsPosterDeleting = (value: boolean): void =>
  {
    this.isPosterDeleting = value;
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private adminMiddleware: AdminMiddlewareService,
    private lessonService: LessonService,
  ){
    this.subscription = this.activateRoute.params.subscribe(params => {
      //ToDo: maybe check for Number???
      this.lessonId = params["lessonId"]
    });
    document.title = "Урок " + (typeof(this.lessonId) !== "undefined" ? this.lessonId : "") + " | STGONLINE - Панель администратора";
    this.lessonForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      meta_keywords: new FormControl(""),
      meta_description: new FormControl(""),
      name: new FormControl(""),
      short_name: new FormControl(""),
      music_name: new FormControl(""),
      poster_src: new FormControl(""),
      teaser_src: new FormControl(""),
      demo_src: new FormControl(""),
      active: new FormControl(0),
      is_visible: new FormControl(false),
  
      days: new FormControl(0),
      price: new FormControl(0),
  
      video_hash_path: new FormControl(""),
      video_duration: new FormControl(0),
  
      is_ai_available: new FormControl(false),
  
      level_id: new FormControl(0),
      lesson_type_id: new FormControl(0),
      teacher_id: new FormControl(0),
      style_id: new FormControl(0),
  
      levelMicroViewModels: new FormControl(new Array<LevelMicroViewModel>),
      lessonTypeMicroViewModels: new FormControl(new Array<LessonTypeMicroViewModel>),
      teacherMicroViewModels: new FormControl(new Array<TeacherMicroViewModel>),
      styleMicroViewModels: new FormControl(new Array<StyleMicroViewModel>)
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

    if(typeof(this.lessonId) === "undefined")
    {
      console.log("lessonId is undefined");
      return;
    }

    await this.lessonService.getEdit(
      this.lessonId!,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setLessonEditViewModel
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

    await this.lessonService.posterDelete(
      this.lessonId!,
      jwt,
      this.setIsPosterDeleting,
      this.setWarning,
      this.posterDeleteSuccessfully
    );
  }

  public posterDeleteSuccessfully = (): void => {
    this.btnModalLessonPosterDeleteClose.nativeElement.click();
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

    await this.lessonService.update(
      this.lessonForm.value.id,
      this.lessonForm.value.meta_keywords,
      this.lessonForm.value.meta_description,
      this.lessonForm.value.name,
      this.lessonForm.value.short_name,
      this.lessonForm.value.music_name,
      this.posterFile,
      this.lessonForm.value.active,
      this.lessonForm.value.is_visible,
      this.lessonForm.value.days,
      this.lessonForm.value.price,
      this.lessonForm.value.video_hash_path,
      this.lessonForm.value.video_duration,
      this.lessonForm.value.is_ai_available,
      this.lessonForm.value.level_id,
      this.lessonForm.value.lesson_type_id,
      this.lessonForm.value.teacher_id,
      this.lessonForm.value.style_id,

      jwt,
      this.setIsSaving,
      this.setWarning,
      this.lessonUpdateSuccessfully
    );
  }

  public lessonUpdateSuccessfully = (): void => {
    if(this.posterFile !== null)
    {
      this.getForEdit();
      this.posterFile = null;
    } else
    {
      this.setSuccess("Успешно сохранено");
    }
  }
}
