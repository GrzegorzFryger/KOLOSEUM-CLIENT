import {Component, OnInit} from '@angular/core';
import {UserRegisterService} from '../user-register/user-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserRegisterService) {
  }

  applicationUserService: UserRegisterService;

  ngOnInit() {
    this.applicationUserService = this.userService;
    this.userService.getUser();
  }

}
