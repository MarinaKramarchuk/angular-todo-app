import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoType } from '../types/todo';

const USER_ID = 1;

const API_URL = 'https://jsonplaceholder.typicode.com/todos';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);

  getTodos() {
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

  toggleTodoCompletion(todo: TodoType) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    return this.http.put<TodoType>(`${API_URL}/${todo.id}`, updatedTodo);
  }

  updateStatus(id: number, completed: boolean) {
    return this.http.patch<TodoType>(`${API_URL}/${id}`, { completed });
  }

  updateTitle(id: number, title: string) {
    return this.http.patch<TodoType>(`${API_URL}/${id}`, { title });
  }

}
