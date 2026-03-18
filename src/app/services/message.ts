import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSignal = signal<string | null>(null);

  readonly message = this.messageSignal.asReadonly();

  setError(text: string) {
    this.messageSignal.set(text);
  }

  clear() {
    this.messageSignal.set(null);
  }
}
