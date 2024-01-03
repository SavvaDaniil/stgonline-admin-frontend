import { Component } from '@angular/core';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';
import { CourseService } from 'src/app/service/course-service/course.service';
import { constant } from 'src/app/util/GlobalVariables';
import { CourseMicroViewModel } from 'src/app/viewModel/course/CourseMicroViewModel';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent 
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

  public courseMicroViewModels: Array<CourseMicroViewModel> | null = []
  public setCourseMicroViewModels = (courseMicroViewModels: Array<CourseMicroViewModel>): void => {
    this.courseMicroViewModels = courseMicroViewModels;
  }
  
  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private courseService: CourseService,
  ){
    document.title = "Курсы | STGONLINE - Панель администратора";
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

    await this.courseService.listMicros(
      jwt,
      this.setIsLoading,
      this.setIsError,
      this.setCourseMicroViewModels
    );
  }

}
