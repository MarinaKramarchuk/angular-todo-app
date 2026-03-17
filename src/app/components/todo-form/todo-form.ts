import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  imports: [],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})
export class TodoForm {
  newTitle = signal('');
  add = output<string>();

  addTodo() {
    const title = this.newTitle().trim();
    if (title) {
      this.add.emit(title);
      this.newTitle.set('');
    }
  }
}
