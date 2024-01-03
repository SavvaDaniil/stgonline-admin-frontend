import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SystemErrorPageComponent } from 'src/app/component/system-error-page/system-error-page.component';
import { SystemLoadingPageComponent } from 'src/app/component/system-loading-page/system-loading-page.component';
import { StatementPreviewDTO } from 'src/app/dto/statement/StatementPreviewDTO';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { StatementService } from 'src/app/service/statement-service/statement.service';
import { padTo2Digits } from 'src/app/util/DateFormatUtil';
import { StatementPreviewViewModel } from 'src/app/viewModel/statement/StatementPreviewViewModel';

@Component({
  standalone: true,
  selector: 'app-statements-page',
  templateUrl: './statements-page.component.html',
  styleUrls: ['./statements-page.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SystemLoadingPageComponent, SystemErrorPageComponent]
})
export class StatementsPageComponent 
{
  public filterForm: FormGroup;

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

  public statementPreviewViewModels: Array<StatementPreviewViewModel> = []
  public setStatementPreviewViewModels = (statementPreviewViewModels: Array<StatementPreviewDTO>): void => {
    this.statementPreviewViewModels = new Array<StatementPreviewViewModel>();
    let dateOfAdd: Date | null = null;
    let dateOfAddStr: string | null;

    statementPreviewViewModels.forEach(statementPreviewViewModel => {
      dateOfAdd = null;
      dateOfAddStr = null;
      if(statementPreviewViewModel.date_of_add !== null)
      {
        dateOfAdd = new Date(statementPreviewViewModel.date_of_add);
        if(dateOfAdd !== null)
        {
          dateOfAddStr = padTo2Digits(dateOfAdd.getDate()) + "." + padTo2Digits(dateOfAdd.getMonth() + 1) + "." + dateOfAdd.getFullYear()
          + " " + padTo2Digits(dateOfAdd.getHours()) + ":" + padTo2Digits(dateOfAdd.getMinutes()) + ":" + padTo2Digits(dateOfAdd.getSeconds());
        }
      }

      this.statementPreviewViewModels.push({
        id: statementPreviewViewModel.id,
        is_need_curator: statementPreviewViewModel.is_need_curator,
        is_payed: statementPreviewViewModel.is_payed,
        status: statementPreviewViewModel.status,
        date_of_add: dateOfAddStr,
        userMicroViewModel: statementPreviewViewModel.userMicroViewModel
      });
    });
    
  }
  
  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private statementService: StatementService,
  ){
    document.title = "Заявки на наставничество | STGONLINE - Панель администратора";
    const currentDate: Date = new Date();

    const monthMinus30Days = (currentDate.getMonth() === 0 ? 12 : currentDate.getMonth() + 1);
    const yearMinus30Days = (currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear());

    this.filterForm = new FormGroup({
      filterDateFrom: new FormControl([
        yearMinus30Days,
        monthMinus30Days,
        padTo2Digits(currentDate.getDate()),
      ].join('-'), Validators.required),
      filterDateTo: new FormControl([
        currentDate.getFullYear(),
        padTo2Digits(currentDate.getMonth() + 1),
        padTo2Digits(currentDate.getDate()),
      ].join('-'), Validators.required),
      search_query: new FormControl("")
    });
  }

  public async ngOnInit(): Promise<void>
  {
    await this.search();
  }

  public async search(): Promise<void>
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

    await this.statementService.search(
      this.filterForm.value.filterDateFrom,
      this.filterForm.value.filterDateTo,
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setStatementPreviewViewModels
    );
  }

}
