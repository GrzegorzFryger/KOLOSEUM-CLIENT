import {ApplicationUser} from './application-user.model';

export class Todos {
  id: number;
  title: string;
  text: string;
  userId: number;
  user: ApplicationUser;
  state: string;
  createdDate: Date;
  lastModification: Date;
}
