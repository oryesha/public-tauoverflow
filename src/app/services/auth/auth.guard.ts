import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      return this.userService.getFirebaseUser().then(() => {
        this.router.navigate(['/home-page']);
        resolve(null);
      }, () => resolve(true));
    });
  }
}
