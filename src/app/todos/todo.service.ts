import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todos} from '../models/todos.model';


@Injectable()
export class TodoService {

  userTodos: Todos[] = [];

  constructor(private http: HttpClient) {
  }

  getAllTodosByUser(userId: number) {
    return this.http.get<Todos[]>('http://localhost:8080/api/todo/byUser/' + userId).toPromise().then(resp => {
      this.userTodos = resp;
      console.log(resp);
    });
  }

  addTodo(todo: Todos) {
    return this.http.post<Todos>('http://localhost:8080/api/todo', todo).toPromise().then(resp => {
      this.userTodos.push(resp);
      console.log(resp);
    });
  }

}
