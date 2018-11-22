import {Component, Input, OnInit} from '@angular/core';
import {UserRegisterService} from './user-register.service';
import {ApplicationUser} from '../models/application-user.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userService: UserRegisterService;
  @Input() userRegister: ApplicationUser = new ApplicationUser();
  errorToShow;
  userRegisteredMessage: string;

  constructor(private service: UserRegisterService) {
  }

  ngOnInit() {
    this.userService = this.service;
  }

  registerUser() {
    this.service.registerUser(this.userRegister).subscribe(resp => {
        this.userRegisteredMessage = 'User has been registered correctly';
        this.userRegister = new ApplicationUser();
        console.log(resp);
      },
      (err: HttpErrorResponse) => {

        this.errorToShow = null;
        this.userRegisteredMessage = null;

        if (err.status !== 200 || 201) {
          this.errorToShow = err.error.errors[0];
        }
      }
    );
  }

  loginUser() {
    console.log(this.userRegister);
    this.service.loginUser(this.userRegister).subscribe(resp => {
      localStorage.clear();
      localStorage.setItem('authUser', JSON.stringify(resp));
      this.service.loginedUser = resp;
    });
  }

}
