import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { AdminService } from 'src/app/service/admin-service/admin.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginPageComponent 
{
  public loginForm: FormGroup;
  private warning: string = "";
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private adminMiddleware: AdminMiddlewareService
  ) {
    document.title = "Аутентификация | STGONLINE - Администрирование";
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  public getWarning(): string
  {
    return this.warning;
  }

  readonly setIsLoading = (value: boolean): void =>
  {
    this.isLoading = value;
  }
  readonly setWarning = (value: string): void =>
  {
    this.warning = value;
  }


  public clearWarning(): void
  {
    this.warning = "";
  }

  public async login(): Promise<void>
  {
    if(this.loginForm.value.username === "" || this.loginForm.value.password === "")
    {
      this.warning = "Все поля обязательны для заполнения";
      return;
    }


    await this.adminService.login(
      this.loginForm.value.username,
      this.loginForm.value.password,
      this.setIsLoading,
      this.setWarning,
      this.adminMiddleware,
      this.router
    )
  }
}
