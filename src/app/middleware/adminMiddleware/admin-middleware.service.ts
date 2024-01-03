import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminMiddlewareService 
{
  constructor() 
  { 
  }

  setJWTToCookie(accessToken: string): void
  {
    let date: Date = new Date();
    date.setTime(date.getTime() + (...));
    const expires: string = "; expires=" + date.toUTCString();
    document.cookie = "AdminXXXXXXXXXXXXXX=" + (accessToken || "")  + expires + "; path=/";
  }

  getJWTFromCookie(): string | null
  {
    const nameEQ = "AdminXXXXXXXXXXXXXX=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) 
    {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        ...
    }
    return null;
  }

  clearJWTCookie(): void
  {
    let date: Date = new Date();
    ...
    let expires: string = "; expires=" + date.toUTCString();
    document.cookie = "AdminXXXXXXXXXXXXXX=" + expires + "; path=/";
    localStorage.clear();
  }

  logout(): void
  {
    const router: Router = inject(Router);
    this.clearJWTCookie();
    router.navigateByUrl("/login");
  }
}
