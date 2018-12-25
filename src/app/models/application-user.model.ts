import {RoleModel} from './role.model';
import {Expierence} from './expierence.model';

export class ApplicationUser {
  id: number;
  firstName: string;
  lastName: string;
  registrationName: string;
  registrationSurname: string;
  email: string;
  password: string;
  roles: Array<RoleModel>;
  experience: Expierence;


}
