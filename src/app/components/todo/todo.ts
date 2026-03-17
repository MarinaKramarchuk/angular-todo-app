import { Component, ElementRef, effect, input, viewChild, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { TodoType } from '../../types/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todo = input.required<TodoType>();

  toggle = output<number>();
  delete = output<number>();
  update = output<{ id: number; title: string }>();

  protected readonly editing = signal(false);

  titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');


  constructor() {
  effect(() => {
    const input = this.titleInput();
    if (input) {
      input.nativeElement.focus();
    }
  });
  }

  onSave(newTitle: string) {
  if (!this.editing()) return;

  const trimmedTitle = newTitle.trim();

  if (trimmedTitle === '') {
    this.delete.emit(this.todo().id);
  } else if (trimmedTitle !== this.todo().title) {
    this.update.emit({ id: this.todo().id, title: trimmedTitle });
  }

  this.editing.set(false);
}

  onToggle() {
    this.toggle.emit(this.todo().id);
  }

  onDelete() {
    this.delete.emit(this.todo().id);
  }
}
