import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todos} from '../models/todos.model';
import {ApplicationUser} from '../models/application-user.model';
import {UserRegisterService} from '../user-register/user-register.service';


@Injectable()
export class TodoService {

  userTodos: Todos[] = [];
  applicationUser: ApplicationUser;

  constructor(private http: HttpClient, private userService: UserRegisterService) {
  }

  getAllTodosByUser(userId: number) {
    this.http.get<Todos[]>('http://localhost:8080/api/todo/byUser/' + userId).toPromise().then(resp => {
      this.userTodos = resp;
      console.log(resp);
    });
  }

 async addTodo(todo: Todos) {
   this.applicationUser = this.userService.getUserObjet();
    await this.http.post<Todos>('http://localhost:8080/api/todo', todo).toPromise().then(resp => {
      this.getAllTodosByUser(this.applicationUser.id);
      console.log(resp);
    });
  }

}
