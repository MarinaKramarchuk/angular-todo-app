import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessageComponent{
  protected readonly title = 'Error';
  protected readonly hidden = signal(false);
  message = input.required<string | null>();
}
