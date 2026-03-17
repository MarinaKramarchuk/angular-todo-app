import {
  Component,
  computed,
  signal,
  OnInit,
  inject,
} from '@angular/core';
import { TodoType } from './types/todo';
import { TodoComponent } from './components/todo/todo';
import { ErrorMessage } from './components/error-message/error-message';
import { TodoForm } from './components/todo-form/todo-form';
import { TodosService } from './services/todos';
import { FilterType } from './types/filter-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent, TodoForm, ErrorMessage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private todoService = inject(TodosService);

  protected readonly todos = signal<TodoType[]>([]);
  protected readonly filter = signal<FilterType>('all');
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Unable to load todos');
      },
    });
  }

  addTodo(title: string) {
    this.todoService.addTodo(title).subscribe({
      next: (newTodo) => {
        this.todos.update((prevTodos) => [...prevTodos, newTodo]);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Unable to add todo');
      }
    });
  }

  toggleTodoCompletion(id: number) {
    const todo = this.todos().find((t) => t.id === id);
    if (!todo) return;

    const newStatus = !todo.completed;

    this.todoService.updateStatus(id, newStatus).subscribe((updatedTodo) => {
      this.todos.update((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: updatedTodo.completed } : t)),
      );
    });

  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.update((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  }

  updateTodoTitle({ id, title }: { id: number; title: string }) {
    if (!title.trim()) return;

    const oldTodos = this.todos();

    this.todos.update((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

    this.todoService.updateTitle(id, title).subscribe({
      next: () => {},
      error: (err) => {
        console.error(err);
        this.todos.set(oldTodos);
        this.errorMessage.set('Unable to update todo title');
      },
    });
  }

  protected readonly filteredTodos = computed(() => {
    const currentFilter = this.filter();
    const allTodos = this.todos();

    if (currentFilter === 'active') {
      return allTodos.filter((todo) => !todo.completed);
    } else if (currentFilter === 'completed') {
      return allTodos.filter((todo) => todo.completed);
    }

    return allTodos;
  });

  protected readonly activeTodos = computed(() => {
    return this.todos().filter((todo) => !todo.completed);
  });

  protected readonly activeCount = computed(() => this.activeTodos().length);

  setFilter(newFilter: FilterType) {
    this.filter.set(newFilter);
  }

  //JSONPlaceholder does not support bulk operations, so these methods update the state locally, without making requests to the server.

  clearCompleted() {
    this.todos.update((allTodos) => allTodos.filter((todo) => !todo.completed));
  }
}
