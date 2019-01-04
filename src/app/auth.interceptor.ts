import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserRegisterService} from './user-register/user-register.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {



  constructor(private service: UserRegisterService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.service.loginedUser.token;

    // todo not working
    //const expirationDate = this.helper.getTokenExpirationDate(token);


    if (this.service.isUserAuthorised() && !req.url.includes('http://localhost:8080/actuator/')) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
          .set('Accept', 'application/json')
          .set('Access-Control-Allow-Origin', 'http://localhost:4200')
          .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS'),
      });

      return next.handle(authReq);
    }

    return next.handle(req);


  }

}
