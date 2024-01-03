import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { AnalyticsDashboardSearchDTO } from 'src/app/dto/analytics/AnalyticsDashboardSearchDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { AnalyticsService } from 'src/app/service/analytics-service/analytics.service';
import { padTo2Digits } from 'src/app/util/DateFormatUtil';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class DashboardPageComponent 
{
  public filterForm: FormGroup;
  //public filterDateFrom: string;
  //public filterDateTo: string;

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

  public analyticsDashboardSearchDTO: AnalyticsDashboardSearchDTO | null = null;
  readonly setAnalyticsDashboardSearchDTO = (analyticsDashboardSearchDTO: AnalyticsDashboardSearchDTO): void => {
    this.analyticsDashboardSearchDTO = analyticsDashboardSearchDTO;
  }

  constructor(
    private analyticsService: AnalyticsService,
    private adminMiddleware: AdminMiddlewareService
  ){
    document.title = "Рабочий стол | STGONLINE - Панель администратора";
    const currentDate: Date = new Date();

    this.filterForm = new FormGroup({
      filterDateFrom: new FormControl([
        currentDate.getFullYear(),
        padTo2Digits(currentDate.getMonth() + 1),
        padTo2Digits(currentDate.getDate()),
      ].join('-'), Validators.required),
      filterDateTo: new FormControl([
        currentDate.getFullYear(),
        padTo2Digits(currentDate.getMonth() + 1),
        padTo2Digits(currentDate.getDate()),
      ].join('-'), Validators.required)
    });
  }

  async ngOnInit(): Promise<void>
  {
    await this.searchAnalyticsDashboardData();
  }

  public async searchAnalyticsDashboardData(): Promise<void>
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.analyticsService.getAnalyticsDashboard(
      jwt,
      this.filterForm.value.filterDateFrom,
      this.filterForm.value.filterDateTo,
      this.setIsLoading,
      this.setIsError,
      this.setAnalyticsDashboardSearchDTO
    )
  }
}
