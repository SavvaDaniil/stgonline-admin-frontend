import { Component } from '@angular/core';
import { Event, NavigationStart, NavigationEnd, NavigationError, Router, RouterModule } from '@angular/router';
import { SubscriptionLiteDTO } from 'src/app/dto/subscription/SubscriptionLiteDTO';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { SubscriptionService } from 'src/app/service/subscription-service/subscription.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.css'],
  imports: [CommonModule, RouterModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class SubscriptionsPageComponent 
{
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

  public subscriptionLiteViewModels: Array<SubscriptionLiteDTO> | null = []
  public setSubscriptionLiteViewModels = (subscriptionLiteViewModels: Array<SubscriptionLiteDTO>): void => {
    this.subscriptionLiteViewModels = subscriptionLiteViewModels;
  }

  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private subscriptionService: SubscriptionService,
  ){
    document.title = "Подписки | STGONLINE - Панель администратора";
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

    await this.subscriptionService.listLites(
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setSubscriptionLiteViewModels
    );
  }

}
