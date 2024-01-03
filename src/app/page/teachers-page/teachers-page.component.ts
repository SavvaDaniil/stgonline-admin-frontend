import { Component, ElementRef, ViewChild } from '@angular/core';
import { TeacherPreviewDTO } from 'src/app/dto/teacher/TeacherPreviewDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { TeacherService } from 'src/app/service/teacher-service/teacher.service';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.css']
})
export class TeachersPageComponent 
{
  @ViewChild('btnModalNewTeacherClose') btnModalNewTeacherClose!: ElementRef<HTMLElement>;

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

  public warning: string = "";
  readonly setWarning = (value: string): void =>
  {
    this.warning = value;
  }
  public clearWarning(): void
  {
    this.setWarning("");
  }

  public teacherPreviewViewModels: Array<TeacherPreviewDTO> | null = []
  public setTeacherPreviewViewModels = (teacherPreviewViewModels: Array<TeacherPreviewDTO>): void => {
    this.teacherPreviewViewModels = teacherPreviewViewModels;
  }

  public isModalAddShowing: boolean = false;
  readonly setIsModalAddShowing = (value: boolean): void =>
  {
    this.isModalAddShowing = value;
  }

  public newTeacherName: string = "";
  public setNewTeacherName(event: any): void
  {
    this.newTeacherName = event.target.value;
  }

  public isAdding: boolean = false;
  readonly setIsAdding = (value: boolean): void =>
  {
    this.isAdding = value;
  }

  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private teacherService: TeacherService
  ){
    document.title = "Преподаватели | STGONLINE - Панель администратора";
  }

  async ngOnInit(): Promise<void>
  {
    await this.listLites();
  }

  public async listLites(): Promise<void>
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.teacherService.listPreviews(
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setTeacherPreviewViewModels
    );
  }

  public async addTeacher(): Promise<void>
  {
    if(this.newTeacherName === "")
    {
      this.setWarning("ФИО обязательно для заполнения");
      return;
    }

    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.teacherService.add(
      this.newTeacherName,
      jwt,
      this.setIsAdding,
      this.setWarning,
      this.addTeacherSuccessfull
    )

  }

  public addTeacherSuccessfull = (): void => {
    this.btnModalNewTeacherClose.nativeElement.click();
    this.listLites();
  }
}
