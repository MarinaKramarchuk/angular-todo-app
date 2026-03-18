import { Component, inject } from '@angular/core';
import { MessageService } from './services/message';
import { TodoListComponent } from "./components/todo-list/todo-list";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ErrorMessageComponent } from "./components/error-message/error-message";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ErrorMessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected messageService = inject(MessageService);
  protected readonly errorMessage = this.messageService.message;


}
