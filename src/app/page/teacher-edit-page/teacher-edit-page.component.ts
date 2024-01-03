import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { TeacherEditDTO } from 'src/app/dto/teacher/TeacherEditDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { TeacherService } from 'src/app/service/teacher-service/teacher.service';
import { constant } from 'src/app/util/GlobalVariables';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  standalone: true,
  selector: 'app-teacher-edit-page',
  templateUrl: './teacher-edit-page.component.html',
  styleUrls: ['./teacher-edit-page.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class TeacherEditPageComponent 
{
  @ViewChild('btnModalTeacherPosterDeleteClose') btnModalTeacherPosterDeleteClose!: ElementRef<HTMLElement>;

  private teacherId: number | undefined;
  private subscription: Subscription;
  public teacherForm: FormGroup;
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

  public setTeacherEditViewModel = (teacherEditViewModel: TeacherEditDTO): void => {
    this.teacherForm.setValue({
      id: teacherEditViewModel.id,
      name: teacherEditViewModel.name,
      poster_src: teacherEditViewModel.poster_src,
      email: teacherEditViewModel.email,
      telegram: teacherEditViewModel.telegram,
      instagram: teacherEditViewModel.instagram,
      is_active: teacherEditViewModel.is_active,
      is_curator: teacherEditViewModel.is_curator,
      price_tariff_1: teacherEditViewModel.price_tariff_1,
      price_tariff_2: teacherEditViewModel.price_tariff_2,
      price_tariff_3: teacherEditViewModel.price_tariff_3,
      description: teacherEditViewModel.description,
      short_description: teacherEditViewModel.short_description,
      mentor_bio: teacherEditViewModel.mentor_bio,
      mentor_awards: teacherEditViewModel.mentor_awards
    });
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private adminMiddleware: AdminMiddlewareService,
    private teacherService: TeacherService,
  ){
    this.subscription = this.activateRoute.params.subscribe(params => {
      //ToDo: maybe check for Number???
      this.teacherId=params["teacherId"]
    });
    document.title = "Преподаватель " + (typeof(this.teacherId) !== "undefined" ? this.teacherId : "") + " | STGONLINE - Панель администратора";
    this.teacherForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl(""),
      poster_src: new FormControl(""),
      email: new FormControl(""),
      telegram: new FormControl(""),
      instagram: new FormControl(""),
      is_active: new FormControl(false),
      is_curator: new FormControl(false),
      price_tariff_1: new FormControl(0),
      price_tariff_2: new FormControl(0),
      price_tariff_3: new FormControl(0),
      description: new FormControl(""),
      short_description: new FormControl(""),
      mentor_bio: new FormControl(""),
      mentor_awards: new FormControl(""),
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

    if(typeof(this.teacherId) === "undefined")
    {
      console.log("teacherId is undefined");
      return;
    }

    await this.teacherService.getEdit(
      this.teacherId!,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setTeacherEditViewModel
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

    await this.teacherService.posterDelete(
      this.teacherId!,
      jwt,
      this.setIsPosterDeleting,
      this.setWarning,
      this.posterDeleteSuccessfully
    );
  }

  public posterDeleteSuccessfully = (): void => {
    this.btnModalTeacherPosterDeleteClose.nativeElement.click();
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

    await this.teacherService.update(
      this.teacherForm.value.id,
      this.teacherForm.value.name,
      this.posterFile,
      this.teacherForm.value.email,
      this.teacherForm.value.telegram,
      this.teacherForm.value.instagram,
      this.teacherForm.value.is_active,
      this.teacherForm.value.is_curator,
      this.teacherForm.value.price_tariff_1,
      this.teacherForm.value.price_tariff_2,
      this.teacherForm.value.price_tariff_3,
      this.teacherForm.value.description,
      this.teacherForm.value.short_description,
      this.teacherForm.value.mentor_bio,
      this.teacherForm.value.mentor_awards,

      jwt,
      this.setIsSaving,
      this.setWarning,
      this.setSuccess
    );
  }
}
