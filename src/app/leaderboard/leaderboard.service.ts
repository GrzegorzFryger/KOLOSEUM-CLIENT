import {Injectable} from '@angular/core';
import {ApplicationUser} from '../models/application-user.model';
import {HttpClient} from '@angular/common/http';
import {Expierence} from '../models/expierence.model';

@Injectable()
export class LeaderboardService {

  applicationUsers: ApplicationUser[];

  constructor(private http: HttpClient) {}


  getAllUsers(): Promise<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>('http://localhost:8080/api/temp/experience').toPromise();
  }
}
