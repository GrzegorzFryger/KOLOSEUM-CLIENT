import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationUser} from '../models/application-user.model';
import {RoleModel} from '../models/role.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allUsers: ApplicationUser[];
  availableRoles: RoleModel[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAvailableRoles();
  }

  getAllUsers() {
    this.http.get<ApplicationUser>('http://localhost:8080/api/user/users').subscribe(resp => {
      this.allUsers = resp;
    });
  }

  getAvailableRoles() {
    this.http.get<RoleModel>('http://localhost:8080/api/tools/roles').subscribe(resp => {
      this.availableRoles = resp;
    });
  }

  isUserHasRole(applicationUser: ApplicationUser, role: string): boolean {
    let hasRole = false;
    applicationUser.roles.forEach(r => {
      if (r.name === role) {
        hasRole = true;
      }
    });
    return hasRole;
  }

  updateRole(applicationUser: ApplicationUser, role: string) {

  }

}
