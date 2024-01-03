import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { StatementEditDTO } from 'src/app/dto/statement/StatementEditDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { StatementService } from 'src/app/service/statement-service/statement.service';
import { padTo2Digits } from 'src/app/util/DateFormatUtil';
import { StatementEditViewModel } from 'src/app/viewModel/statement/StatementEditViewModel';
import { TeacherMicroViewModel } from 'src/app/viewModel/teacher/TeacherMicroViewModel';

@Component({
  standalone: true,
  selector: 'app-statement-edit-page',
  templateUrl: './statement-edit-page.component.html',
  styleUrls: ['./statement-edit-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class StatementEditPageComponent 
{
  private statementId: number | undefined;
  private subscription: Subscription;
  public statementForm: FormGroup;

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

  public statementEditViewModel: StatementEditViewModel | null = null;
  readonly setStatementEditViewModel = (statementEditDTO: StatementEditDTO): void => {
    
    let dateOfAdd: Date | null = null;
    let dateOfAddStr: string | null = null;
    if(statementEditDTO.date_of_add !== null)
    {
      dateOfAdd = new Date(statementEditDTO.date_of_add);
      dateOfAddStr = padTo2Digits(dateOfAdd.getDate()) + "." + padTo2Digits(dateOfAdd.getMonth() + 1) + "." + dateOfAdd.getFullYear()
      + " " + padTo2Digits(dateOfAdd.getHours()) + ":" + padTo2Digits(dateOfAdd.getMinutes()) + ":" + padTo2Digits(dateOfAdd.getSeconds());
    }
    let dateOfActive: Date | null = null;
    let dateOfActiveStr: string | null = null;
    if(statementEditDTO.date_of_active !== null)
    {
      dateOfActive = new Date(statementEditDTO.date_of_active);
      dateOfActiveStr = padTo2Digits(dateOfActive.getDate()) + "." + padTo2Digits(dateOfActive.getMonth() + 1) + "." + dateOfActive.getFullYear()
      + " " + padTo2Digits(dateOfActive.getHours()) + ":" + padTo2Digits(dateOfActive.getMinutes()) + ":" + padTo2Digits(dateOfActive.getSeconds());
    }

    this.statementEditViewModel = {
      id: statementEditDTO.id,
      userMicroViewModel: statementEditDTO.userMicroViewModel,
      is_need_curator: statementEditDTO.is_need_curator,

      experience: statementEditDTO.experience,
      expectations: statementEditDTO.expectations,
      expected_time_for_lessons: statementEditDTO.expected_time_for_lessons,
  
      idols: statementEditDTO.idols,
      link1: statementEditDTO.link1,
      link2: statementEditDTO.link2,
      link3: statementEditDTO.link3,
  
      teacher_desired_id: statementEditDTO.teacherDesiredMicroViewModel !== null ? statementEditDTO.teacherDesiredMicroViewModel.id : 0,
      teacher_id: statementEditDTO.teacherMicroViewModel !== null ? statementEditDTO.teacherMicroViewModel.id : 0,
  
      is_payed: statementEditDTO.is_payed,
      status: statementEditDTO.status,
      date_of_add: dateOfAddStr,
      date_of_active: dateOfActiveStr
    }

    this.statementForm.setValue({
      id: statementEditDTO.id,
      teacher_id: statementEditDTO.teacherMicroViewModel !== null ? statementEditDTO.teacherMicroViewModel.id : 0
    });
  }

  public teacherMicroViewModels: Array<TeacherMicroViewModel> = new Array<TeacherMicroViewModel>();
  readonly setTeacherMicroViewModels = (teacherMicroViewModels: Array<TeacherMicroViewModel>): void => {
    this.teacherMicroViewModels = new Array<TeacherMicroViewModel>();
    this.teacherMicroViewModels.push({
      id: 0,
      name: "не выбрано"
    });
    this.teacherMicroViewModels.push(...teacherMicroViewModels);
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private adminMiddleware: AdminMiddlewareService,
    private statementService: StatementService,
  ){
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.statementId = params["statementId"]
    });
    document.title = "Заявление " + (typeof(this.statementId) !== "undefined" ? this.statementId : "") + " | STGONLINE - Панель администратора";
    this.statementForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      teacher_id: new FormControl(0)
    });
  }

  public async ngOnInit(): Promise<void>
  {
    await this.getEdit();
  }

  public async getEdit(): Promise<void>
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    if(typeof(this.statementId) === "undefined")
    {
      console.log("statementId is undefined");
      return;
    }

    await this.statementService.getEdit(
      this.statementId!,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setStatementEditViewModel,
      this.setTeacherMicroViewModels
    );
  }

  public async update(): Promise<void>
  {
    if(this.isSaving)
    {
      return;
    }
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }
    console.log("this.statementForm.value.teacher_id: " + this.statementForm.value.teacher_id);

    await this.statementService.update(
      this.statementForm.value.id,
      this.statementForm.value.teacher_id,
      jwt,
      this.setIsSaving,
      this.setWarning,
      this.updateSuccessfully,
    );

  }

  readonly updateSuccessfully = (): void => {
    this.setSuccess("Успешно сохранено");
  }

}
