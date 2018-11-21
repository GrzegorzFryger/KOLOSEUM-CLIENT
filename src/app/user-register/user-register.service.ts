import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationUser} from '../models/application-user.model';

@Injectable()
export class UserRegisterService {

  applicationUser: ApplicationUser = new ApplicationUser();

  constructor(private http: HttpClient) {
  }

  registerUser() {
    this.http.post('http://localhost:8080/api/signup', this.applicationUser).toPromise().then( resp => {
      console.log(resp);
    });
  }

  check() {
    console.log(this.applicationUser);
  }

}
