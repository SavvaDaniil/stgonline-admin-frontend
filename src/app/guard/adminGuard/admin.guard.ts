import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminMiddlewareService } from 'src/app/middleware/adminMiddleware/admin-middleware.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  ) => {

    const adminMiddleware: AdminMiddlewareService = inject(AdminMiddlewareService);
    if(adminMiddleware.getJWTFromCookie() !== null && ...)
    {
      return true;
    }
    const router = inject(Router);
    router.navigateByUrl("/login");
    return false;
};
