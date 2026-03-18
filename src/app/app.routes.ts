import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list';
import { AboutPageComponent } from './components/about-page/about-page';

export const routes: Routes = [
  { path: 'todos', component: TodoListComponent},
  { path: 'about', component: AboutPageComponent},
  { path: '**', redirectTo: '/todos' , pathMatch: 'full'},
];
