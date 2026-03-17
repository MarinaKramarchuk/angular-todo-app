import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo';
import { TodoType } from '../../types/todo';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  });

  it('should create and receive todo input', () => {
    const mockTodo: TodoType = {
      id: 1,
      title: 'Test Todo',
      completed: false,
      userId: 1,
    };

    fixture.componentRef.setInput('todo', mockTodo);

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
