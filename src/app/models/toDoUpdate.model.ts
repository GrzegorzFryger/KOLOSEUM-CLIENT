import {Todos} from './todos.model';

export class ToDoUpdate {
  title: string;
  text: string;
  userId: number;
  state: string;
  cardToUpdateId: number;


  constructor(todoCard: Todos) {

    this.title = todoCard.title;
    this.text = todoCard.text;
    this.userId = todoCard.user.id;
    this.state = todoCard.state;
    this.cardToUpdateId = todoCard.id;
  }
}
