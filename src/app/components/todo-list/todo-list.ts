import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { TodosService } from '../../services/todos';
import { FilterType } from '../../types/filter-types';
import { TodoType } from '../../types/todo';
import { MessageService } from '../../services/message';
import { TodoComponent } from '../todo/todo';
import { TodoFormComponent } from '../todo-form/todo-form';
import { FilterComponent } from '../filter/filter';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  imports: [TodoFormComponent, TodoComponent, FilterComponent],
  styleUrl: './todo-list.scss',
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodosService);
  private messageService = inject(MessageService);
  protected readonly todos = signal<TodoType[]>([]);
  protected readonly filter = signal<FilterType>('all');

  protected readonly isLoading = signal(true);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.messageService.setError('Unable to load todos');
        this.isLoading.set(false);
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
        this.messageService.setError('Unable to add todo');
      },
    });
  }

  toggleTodoCompletion(id: number) {
    const todo = this.todos().find((t) => t.id === id);
    if (!todo) return;

    const newStatus = !todo.completed;

    this.todoService.updateStatus(id, newStatus).subscribe({
      next: (updatedTodo) => {
        this.todos.update((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: updatedTodo.completed } : t)),
        );
      },
      error: (err: Error) => {
        console.error(err);
        this.messageService.setError('Unable to update todo status');
      },
    });
  }

  allCompleted = computed(
    () => this.todos().length > 0 && this.todos().every((todo) => todo.completed),
  );

  toggleAll() {
    const targetStatus = !this.allCompleted();
    const currentTodos = this.todos();

    this.todoService.updateAll(currentTodos, targetStatus).subscribe({
      next: (updatedTodos) => {
        this.todos.update((list) => list.map((todo) => ({ ...todo, completed: targetStatus })));
      },
      error: (err) => {
        this.messageService.setError('Failed to update some tasks');
        console.error(err);
      },
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos.update((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      },
      error: (err: Error) => {
        console.error(err);
        this.messageService.setError('Unable to delete todo');
      },
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
        this.messageService.setError('Unable to update todo title');
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

  clearCompleted() {
    const completedTodos = this.todos().filter((t) => t.completed);

    if (completedTodos.length === 0) return;

    this.todoService.deleteMultiple(this.todos()).subscribe({
      next: () => {
        this.todos.update((allTodos) => allTodos.filter((todo) => !todo.completed));
        console.log('Server cleaned up successfully');
      },
      error: (err) => {
        this.messageService.setError('Failed to clear completed tasks on server');
      },
    });
  }
}
