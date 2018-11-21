import {Component, OnInit} from '@angular/core';
import {UserRegisterService} from './user-register.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userService: UserRegisterService;

  constructor(private service: UserRegisterService) {
  }

  ngOnInit() {
    this.userService = this.service;
  }

}
