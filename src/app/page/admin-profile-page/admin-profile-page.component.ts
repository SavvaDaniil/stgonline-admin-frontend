import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { AdminProfileDTO } from 'src/app/dto/admin/AdminProfileDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { AdminService } from 'src/app/service/admin-service/admin.service';

@Component({
  standalone: true,
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class AdminProfilePageComponent 
{
  public profileForm: FormGroup;
  public warning: string = "";
  public success: string = "";
  public adminProfileDTO: AdminProfileDTO | null = null;

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

  constructor(
    private adminService: AdminService,
    private adminMiddleware: AdminMiddlewareService
  ){
    document.title = "Профиль | STGONLINE - Панель администратора";
    this.profileForm = new FormGroup({
      username: new FormControl("", Validators.required),
      firstname: new FormControl(""),
      position: new FormControl(""),
      passwordCurrent: new FormControl(""),
      passwordNew: new FormControl(""),
      passwordNewAgain: new FormControl("")
    });
  }


  readonly setIsSaving = (value: boolean): void =>
  {
    this.isSaving = value;
  }

  readonly setWarning = (value: string): void =>
  {
    this.warning = value;
  }
  public clearWarning(): void
  {
    this.setWarning("");
    this.setSuccess("");
  }

  readonly setSuccess = (value: string): void =>
  {
    this.success = value;
  }

  readonly getProfile = async(): Promise<void> => {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }
    await this.adminService.profileGet(
      jwt,
      this.setProfileForm,
      this.setIsLoading,
      this.setIsError
    )
  }

  readonly setProfileForm = (adminProfileDTO: AdminProfileDTO): void =>
  {
    this.profileForm.setValue({
      username : adminProfileDTO.username,
      firstname : adminProfileDTO.firstname,
      position : adminProfileDTO.position,
      passwordCurrent : "",
      passwordNew : "",
      passwordNewAgain : ""
    });

  }

  async ngOnInit()
  {
    this.getProfile();
  }

  async update(): Promise<void>
  {
    if(this.isLoading)
    {
      return;
    }

    if(this.profileForm.value === ""){
      this.setWarning("Поле 'логин' не может быть пустым");
      return;
    }
    if(this.profileForm.value.passwordNew !== "" && this.profileForm.value.passwordNew !== this.profileForm.value.passwordNewAgain){
      this.setWarning("Пароли не совпадают");
      return;
    }
    if(this.profileForm.value.passwordNew !== "" && this.profileForm.value.passwordCurrent === ""){
      this.setWarning("Введите пожалуйста текущий пароль");
      return;
    }

    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.adminService.profileUpdate(
      jwt,
      this.profileForm.value.username,
      this.profileForm.value.firstname,
      this.profileForm.value.position,
      this.profileForm.value.passwordCurrent,
      this.profileForm.value.passwordNew,
      this.setIsSaving,
      this.setWarning,
      this.setSuccess,
      this.adminMiddleware
    );
  }

}
