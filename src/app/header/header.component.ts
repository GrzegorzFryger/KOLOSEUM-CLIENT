import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserRegisterService} from '../user-register/user-register.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Todos} from '../models/todos.model';
import {TodosComponent} from '../todos/todos.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true
  };

  todos: Todos = new Todos();
  todosComponent: TodosComponent;

  constructor(private userService: UserRegisterService, private modalService: BsModalService, private todoComponent: TodosComponent) {
    this.todosComponent = todoComponent;
  }

  applicationUserService: UserRegisterService;

  ngOnInit() {
    this.applicationUserService = this.userService;
    this.userService.getUser();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


}
