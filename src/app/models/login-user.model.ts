import {ApplicationUser} from './application-user.model';

export class LoginUserModel {
  applicationUser: ApplicationUser;
  token: string;
  tokenType: string;
}
