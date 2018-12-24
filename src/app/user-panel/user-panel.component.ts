import { Component, OnInit } from '@angular/core';
import {UserRegisterService} from '../user-register/user-register.service';
import {ApplicationUser} from '../models/application-user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  applicationUser: ApplicationUser;
  private usersService: UserRegisterService;
  userRoles: String[];


  constructor(private userService: UserRegisterService, private router: Router, private route: ActivatedRoute ) {
    this.usersService = userService;
  }

  ngOnInit() {

    this.applicationUser = this.userService.getUserObjet();
  }

  onSettings() {
    this.router.navigate(['settings'], {relativeTo: this.route});

  }

  onScoreBoard() {
    this.router.navigate(['scoreboard'], {relativeTo: this.route});
  }

}
