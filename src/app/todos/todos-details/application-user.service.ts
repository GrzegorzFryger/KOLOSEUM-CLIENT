
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationUser} from '../../models/application-user.model';
import {Todos} from '../../models/todos.model';

@Injectable()
export class ApplicationUserService {


  constructor(private http: HttpClient) {

  }

  // todo move funcjon to globa user service
  getAllPersonByName( value: string): Observable<ApplicationUser[]> {
    let param = new HttpParams().set('firstName', value);
    return this.http.get<ApplicationUser[]>('http://localhost:8080/api/user/search/like', {params: param } );
  }
}
