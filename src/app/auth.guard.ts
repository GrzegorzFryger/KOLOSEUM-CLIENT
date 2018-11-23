import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserRegisterService} from './user-register/user-register.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserRegisterService) {
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isUserAuthorised()) {
      return true;
    }
    this.router.navigate(['/user']);
    return false;
  }

}
