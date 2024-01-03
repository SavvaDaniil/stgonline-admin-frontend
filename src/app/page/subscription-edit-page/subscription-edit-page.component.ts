import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { SubscriptionEditDTO } from 'src/app/dto/subscription/SubscriptionEditDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { SubscriptionService } from 'src/app/service/subscription-service/subscription.service';

@Component({
  standalone: true,
  selector: 'app-subscription-edit-page',
  templateUrl: './subscription-edit-page.component.html',
  styleUrls: ['./subscription-edit-page.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class SubscriptionEditPageComponent 
{
  private subscriptionId: number | undefined;
  private subscription: Subscription;
  public subscriptionForm: FormGroup;

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


  constructor(
    private activateRoute: ActivatedRoute,
    private adminMiddleware: AdminMiddlewareService,
    private subscriptionService: SubscriptionService,
  ){
    this.subscription = activateRoute.params.subscribe(params=>this.subscriptionId=params["subscriptionId"]);
    document.title = "Подписка " + (typeof(this.subscriptionId) !== "undefined" ? this.subscriptionId : "") + " | STGONLINE - Панель администратора";
    this.subscriptionForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl(""),
      price: new FormControl(0),
      days: new FormControl(0),
      is_active: new FormControl(false),
      order_in_list: new FormControl(0)
    });
  }

  async ngOnInit(): Promise<void>
  {
    this.getForEdit();
  }

  public setSubscriptionEditViewModel = (subscriptionEditViewModel: SubscriptionEditDTO): void => {
    this.subscriptionForm.setValue({
      id: subscriptionEditViewModel.id,
      name: subscriptionEditViewModel.name,
      price: subscriptionEditViewModel.price,
      days:subscriptionEditViewModel.days,
      is_active: subscriptionEditViewModel.is_active,
      order_in_list: subscriptionEditViewModel.order_in_list
    });
  }

  public async getForEdit(): Promise<void> 
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    if(typeof(this.subscriptionId) === "undefined")
    {
      console.log("subscriptionId is undefined");
      return;
    }

    await this.subscriptionService.getEdit(
      this.subscriptionId!,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setSubscriptionEditViewModel
    );
  }

  public setIsActive(value: boolean): void
  {
    this.subscriptionForm.setValue({
      is_active: value
    });
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

    await this.subscriptionService.update(
      this.subscriptionForm.value.id,
      this.subscriptionForm.value.name,
      this.subscriptionForm.value.price,
      this.subscriptionForm.value.days,
      this.subscriptionForm.value.is_active,
      this.subscriptionForm.value.order_in_list,
      jwt,
      this.setIsSaving,
      this.setWarning,
      this.setSuccess
    );
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
