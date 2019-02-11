import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserService} from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const isLoginPage = route.url.length === 0;
    return new Promise<boolean>((resolve) => {
      return this.userService.getFirebaseUser().then((user) => {
        if (isLoginPage && user) {
          this.router.navigate(['/home-page']);
          resolve(false);
        } else if (!isLoginPage && !user) {
          this.router.navigate(['']);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
