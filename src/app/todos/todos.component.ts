import {Component, OnInit} from '@angular/core';
import {TodoService} from './todo.service';
import {ApplicationUser} from '../models/application-user.model';
import {UserRegisterService} from '../user-register/user-register.service';
import {Todos} from '../models/todos.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  applicationUser: ApplicationUser;
  usersService: UserRegisterService;
  todosService: TodoService;
  checkboxValue: boolean;


  constructor(private todoService: TodoService, private userService: UserRegisterService) {
    this.usersService = userService;
    this.todosService = todoService;
  }

  ngOnInit() {
    this.applicationUser = this.usersService.getUserObjet();
    this.getTodosByUser(this.applicationUser.id);
    console.log(this.applicationUser);
  }


  getTodosByUser(userId: number) {
    this.todoService.getAllTodosByUser(userId);
  }


  addTodo(todo: Todos) {
    this.applicationUser = this.usersService.getUserObjet();
    todo.userId = this.applicationUser.id;
       this.todoService.addTodo(todo);
  }


}
