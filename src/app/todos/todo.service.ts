import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todos} from '../models/todos.model';
import {ApplicationUser} from '../models/application-user.model';
import {UserRegisterService} from '../user-register/user-register.service';
import {Observable, Subject} from 'rxjs';
import {ToDoUpdate} from '../models/toDoUpdate.model';
import {computeStyle} from '@angular/animations/browser/src/util';


@Injectable()
export class TodoService {

  private toDoCardSharedSource = new Subject<Todos>();
  toDoCardShared: Observable<Todos>;

  userTodos: Todos[] = [];
  applicationUser: ApplicationUser;

  constructor(private http: HttpClient, private userService: UserRegisterService) {

    this.toDoCardShared = this.toDoCardSharedSource.asObservable();

  }

  addToDoCardtoShare(todo: Todos) {
    this.toDoCardSharedSource.next(todo);
  }

  moveCardToOtherUser(cardId: number, userId: number ) {
    this.http.post<any>('http://localhost:8080/api/todo/moveCard', {cardId: cardId, idUserToMove: userId} ).toPromise().then(resp => {
      console.log(resp);
    });
  }

  getAllTodosByUser(userId: number) {
    this.http.get<Todos[]>('http://localhost:8080/api/todo/byUser/' + userId).toPromise().then(resp => {
      this.userTodos = resp;
      console.log('service todo1' + resp);
    });
  }
  
  getAllTodo(userId: number): Observable<Todos[]>  {
    return this.http.get<Todos[]>('http://localhost:8080/api/todo/byUser/' + userId);
  }

  getCardById(idCard: number): Promise<Todos> {
    return this.http.get<Todos>('http://localhost:8080/api/todo/' + idCard).toPromise();
  }

  updateToDo (todo: ToDoUpdate): Observable<Todos> {

    return this.http.put<Todos>('http://localhost:8080/api/todo', todo);
  }

  async addTodo(todo: Todos) {
    this.applicationUser = this.userService.getUserObjet();
    await this.http.post<Todos>('http://localhost:8080/api/todo', todo).toPromise().then(resp => {
      this.getAllTodosByUser(this.applicationUser.id);
      console.log(resp);
    });
  }
}
