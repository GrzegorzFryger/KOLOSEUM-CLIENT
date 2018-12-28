import { Component, OnInit } from '@angular/core';
import {ApplicationUser} from '../models/application-user.model';
import {UserRegisterService} from '../user-register/user-register.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.css']
})
export class SystemInfoComponent implements OnInit {

  currentUser: ApplicationUser;
  systemStatus: string;
  systemHttpTrace = [];
  systemEnv = [];

  constructor(private userService: UserRegisterService, private http: HttpClient) { }

  ngOnInit() {
    this.currentUser = this.userService.getUserObjet();
    this.getHttpTrace();
    this.getSystemStatus();
  }



  isUserHasRole(applicationUser: ApplicationUser, role: string): boolean {
    let hasRole = false;

    if (applicationUser.roles === undefined) {
      return false;
    }
    applicationUser.roles.forEach(r => {
      if (r.name === role) {
        hasRole = true;
      }
    });
    return hasRole;
  }

  getHttpTrace() {
    this.http.get<any>('http://localhost:8080/actuator/httptrace').subscribe( resp => {
      this.systemHttpTrace = resp;
    });
  }

  getSystemStatus() {
    this.http.get<any>('http://localhost:8080/actuator/health').subscribe( resp => {
      this.systemStatus = resp;
    });
  }




}
