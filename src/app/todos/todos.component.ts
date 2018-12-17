import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from './todo.service';
import {ApplicationUser} from '../models/application-user.model';
import {UserRegisterService} from '../user-register/user-register.service';
import {Todos} from '../models/todos.model';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule} from '@angular/forms';
import {ToDoUpdate} from '../models/toDoUpdate.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [TodoService]
})
export class TodosComponent implements OnInit {

  @ViewChild('toDoForm') newCardForm: NgForm;

  applicationUser: ApplicationUser;
  usersService: UserRegisterService;
  todosService: TodoService;

  todosList: Array<Todos> = new Array<Todos>();
  todoListDOne: Array<Todos> = new Array<Todos>();


  constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService,
              private userService: UserRegisterService) {
    this.usersService = userService;
    this.todosService = todoService;
  }

  ngOnInit() {

    this.applicationUser = this.usersService.getUserObjet();
    this.todoService.getAllTodo(this.applicationUser.id).subscribe(
      resp => {
        resp.map(x => {
          if (x.state === 'DONE') {
            this.todoListDOne.push(x);
          } else {
            this.todosList.push(x);
          }
        });
      }
    );

    this.todoService.toDoCardShared.subscribe(resp => {
      this.todosList.splice(this.todosList.indexOf(resp), 1);
    });

  }


  changeStateToDone(id: number, isChecked: boolean) {

    if (isChecked) {

      const temp = this.todosList[id];
      temp.state = 'DONE';
      this.todosList.splice(id, 1);

      this.todoService.updateToDo(new ToDoUpdate(temp))
        .subscribe(resp =>
          this.todoListDOne.push(resp)
        );


    } else {
      const temp = this.todoListDOne[id];
      temp.state = 'INPROGRESS';

      this.todoListDOne.splice(id, 1);
      this.todoService.updateToDo(new ToDoUpdate(temp))
        .subscribe(resp =>
          this.todosList.push(resp)
        );

    }
  }

  addNewCard() {

    const newToDO = new Todos();
    newToDO.title = this.newCardForm.value.title;
    this.addTodo(newToDO);
    this.todosList.push(newToDO);

    this.newCardForm.onReset();
  }

  // to refactor - move to service
  addTodo(todo: Todos) {
    this.applicationUser = this.usersService.getUserObjet();
    todo.userId = this.applicationUser.id;
    this.todoService.addTodo(todo);
  }


}
