import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationUser} from '../models/application-user.model';
import {RoleModel} from '../models/role.model';
import {UserRegisterService} from '../user-register/user-register.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allUsers: ApplicationUser[];
  availableRoles: RoleModel[];
  currentUser: ApplicationUser;

  constructor(private http: HttpClient, private userService: UserRegisterService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAvailableRoles();
    this.currentUser = this.userService.getUserObjet();
  }

  getAllUsers() {
    this.http.get<ApplicationUser[]>('http://localhost:8080/api/user/users').subscribe(resp => {
      this.allUsers = resp;
    });
  }

  getAvailableRoles() {
    this.http.get<RoleModel[]>('http://localhost:8080/api/tools/roles').subscribe(resp => {
      this.availableRoles = resp;
    });
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

  updateRole(applicationUser: ApplicationUser, role: string, userIndex: number) {

    const roleObject: RoleModel = {name: role};
    let roleToRemove;

    if (this.isUserHasRole(applicationUser, role)) {
      applicationUser.roles.forEach( r => {
        if ( r.name === role) {
          roleToRemove = r;
        }
      });
      applicationUser.roles.splice(applicationUser.roles.indexOf(roleToRemove), 1);
    } else {
      applicationUser.roles.push(roleObject);
    }

    console.log(applicationUser);

    this.http.put<ApplicationUser>('http://localhost:8080/api/user/' + applicationUser.id, applicationUser).subscribe(resp => {
      this.allUsers.splice(userIndex);
      this.allUsers.push(resp);
    });
  }

}
