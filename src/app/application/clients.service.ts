import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../models/person.model';

@Injectable()
export class ClientsService {

  constructor(private http: HttpClient) { }



   findClientsByPhoneNumber( phoneNumber: string): Observable<Person[]> {

    const param = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.get<Person[]>('http://localhost:8080/api/clients/search', {params: param });
  }
}
