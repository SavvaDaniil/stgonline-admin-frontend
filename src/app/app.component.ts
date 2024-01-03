import { Component } from '@angular/core';
import { AdminMiddlewareService } from './middleware/adminMiddleware/admin-middleware.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent 
{
  title: string = 'stgonlineAdmin';

  constructor(
    private adminMiddleware: AdminMiddlewareService
  ){}

  get isAuth(): boolean
  {
    /*
    const jwt: string | null = this.adminMiddleware.getJWT();
    if(jwt !== null && typeof(jwt) !== "undefined" && jwt !== "")
    {
      return true;
    }
    */
    return false;
  }

  logout(): void
  {
    console.log("logout");
  }
}
