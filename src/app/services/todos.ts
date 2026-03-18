import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoType } from '../types/todo';
import { forkJoin, Observable, of } from 'rxjs';

const USER_ID = 1;

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);

  getTodos(): Observable<TodoType[]> {
    return this.http.get<TodoType[]>(`${API_URL}?userId=${USER_ID}`);
  }

  addTodo(title: string) {
    const newTodo: Omit<TodoType, 'id'> = {
      userId: USER_ID,
      title,
      completed: false,
    };
    return this.http.post<TodoType>(API_URL, newTodo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${API_URL}/${id}`);
  }

  deleteMultiple(todos: TodoType[]): Observable<any> {
  const completedIds = todos.filter(t => t.completed).map(t => t.id);

  if (completedIds.length === 0) return of([]);

  const requests = completedIds.map(id =>
    this.http.delete(`${API_URL}/${id}`)
  );

  return forkJoin(requests);
}

  toggleTodoCompletion(todo: TodoType) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    return this.http.put<TodoType>(`${API_URL}/${todo.id}`, updatedTodo);
  }

  updateAll(todos: TodoType[], completed: boolean): Observable<TodoType[]> {
  const requests = todos.map(todo =>
    this.http.patch<TodoType>(`${API_URL}/${todo.id}`, { completed })
  );

  return forkJoin(requests);
}

  updateStatus(id: number, completed: boolean) {
    return this.http.patch<TodoType>(`${API_URL}/${id}`, { completed });
  }

  updateTitle(id: number, title: string) {
    return this.http.patch<TodoType>(`${API_URL}/${id}`, { title });
  }


}
