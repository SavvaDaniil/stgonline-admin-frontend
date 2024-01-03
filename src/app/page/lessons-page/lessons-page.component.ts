import { Component } from '@angular/core';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { LessonService } from 'src/app/service/lesson-service/lesson.service';
import { constant } from 'src/app/util/GlobalVariables';
import { LessonMicroViewModel } from 'src/app/viewModel/lesson/LessonMicroViewModel';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.component.html',
  styleUrls: ['./lessons-page.component.css']
})
export class LessonsPageComponent 
{
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

  public lessonMicroViewModels: Array<LessonMicroViewModel> | null = []
  public setLessonMicroViewModels = (lessonMicroViewModels: Array<LessonMicroViewModel>): void => {
    this.lessonMicroViewModels = lessonMicroViewModels;
  }
  
  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private lessonService: LessonService,
  ){
    document.title = "Уроки | STGONLINE - Панель администратора";
  }

  async ngOnInit(): Promise<void>
  {
    await this.listMicros();
  }

  public async listMicros(): Promise<void>
  {
    const jwt: string | null = this.adminMiddleware.getJWTFromCookie();
    if(jwt === null)
    {
      return;
    }

    await this.lessonService.listMicros(
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setLessonMicroViewModels
    );
  }


}
