import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApplicationUser} from '../models/application-user.model';
import {LoginUserModel} from '../models/login-user.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/index';

@Injectable()
export class UserRegisterService {

  loginedUser: LoginUserModel = new LoginUserModel();

  constructor(private http: HttpClient, private router: Router) {
  }

  registerUser(user: ApplicationUser) {
    return this.http.post<ApplicationUser>('http://localhost:8080/api/signup', user);
  }

  loginUser(user: ApplicationUser) {
    return this.http.post<LoginUserModel>('http://localhost:8080/api/signin', user);
  }

  isUserAuthorised(): boolean {
    return localStorage.getItem('authUser') !== null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/user']);
  }

  getUser() {
    if (this.isUserAuthorised()) {
      this.loginedUser = JSON.parse(localStorage.getItem('authUser'));
    }
  }

  getUserObjet(): ApplicationUser {
    if (this.isUserAuthorised()) {
      return this.loginedUser.applicationUser;
    }
  }

  isUserHasRole(roleInput: string): boolean {
    let isUserHasRole = false;
    this.loginedUser.applicationUser.roles.forEach(role => {
      if (role.name === roleInput) {
        isUserHasRole = true;
      }
    });

    return isUserHasRole;
  }

  getAllPersonByName( value: string): Observable<ApplicationUser[]> {
    const param = new HttpParams().set('firstName', value);
    return this.http.get<ApplicationUser[]>('http://localhost:8080/api/user/search/like', {params: param } );
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<ApplicationUser> {

    return this.http.put<ApplicationUser>(`http://localhost:8080/api/user/${this.loginedUser.applicationUser.id}/password`,
      { oldPassword: oldPassword, newPassword: newPassword});
  }

  updateEmail(email: string): Observable<ApplicationUser> {

    const temp = this.loginedUser.applicationUser;
    temp.email = email;
    return this.http.put<ApplicationUser>('http://localhost:8080/api/user/' + this.loginedUser.applicationUser.id, temp );
  }
}

