import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationUser} from '../models/application-user.model';
import {Observable} from 'rxjs/Observable';
import {LoginUserModel} from '../models/login-user.model';

@Injectable()
export class UserRegisterService {

  loginedUser: LoginUserModel = new LoginUserModel();

  constructor(private http: HttpClient) {
  }

  registerUser(user: ApplicationUser): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>('http://localhost:8080/api/signup', user);
  }

  loginUser(user: ApplicationUser): Observable<LoginUserModel> {
    return this.http.post<LoginUserModel>('http://localhost:8080/api/signin', user);
  }

  isUserAuthorised(): boolean {
    return localStorage.getItem('authUser') !== null;
  }

  logout() {
    localStorage.clear();
  }

}

