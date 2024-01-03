import { Component } from '@angular/core';
import { Event, NavigationStart, NavigationEnd, NavigationError, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent 
{
  public title: string = "";
  public routerSubscription: Subscription;

  constructor(
    private adminMiddleware: AdminMiddlewareService,
    private router: Router
  ){
    this.routerSubscription = this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) 
      {
          switch(event.url)
          {
            case "/":
              this.title = "Рабочий стол";
              break;
            case "/profile":
              this.title = "Профиль";
              break;
            case "/subscriptions":
              this.title = "Подписки";
              break;
            case "/teachers":
              this.title = "Преподаватели";
              break;
            case "/lessons":
              this.title = "Уроки";
              break;
            case "/courses":
              this.title = "Курсы";
              break;
            case "/statements":
              this.title = "Заявления на наставничество";
              break;
            default:
              this.title = "";
              break;
          }

          if(event.url.includes("subscription/"))
          {
            this.title = "Редактирование подписки";
          } else if(event.url.includes("teacher/"))
          {
            this.title = "Редактирование преподавателя";
          } else if(event.url.includes("lesson/"))
          {
            this.title = "Редактирование урока";
          } else if(event.url.includes("course/"))
          {
            this.title = "Редактирование курса";
          } else if(event.url.includes("statement/"))
          {
            this.title = "Редактирование заявки на наставничество";
          }
      }
  });
  }

  ngOnDestroy(): void
  {
    this.routerSubscription.unsubscribe();
  }

  logout(): void
  {
    this.adminMiddleware.clearJWTCookie();
    this.router.navigateByUrl("login");
  }
}
