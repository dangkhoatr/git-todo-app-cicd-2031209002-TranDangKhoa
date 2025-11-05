const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
  let service;

  beforeEach(() => {
    service = new TodoService();
    service.todos = []; // reset state
  });

  test('should add a new todo', () => {
    // Act
    const text = 'Some text';
    service.addTodo(text);

    // Assert
    expect(service.todos).toHaveLength(1);
    expect(service.todos[0].text).toBe(text);
    expect(service.todos[0].completed).toBe(false);
    expect(service.todos[0].id).toBeDefined();
  });

  test('should toggle the completed state of a todo', () => {
    // Arrange
    service.addTodo('Toggle me');
    const id = service.todos[0].id;

    // Act + Assert (first toggle → true)
    service.toggleTodoComplete(id);
    expect(service.todos[0].completed).toBe(true);

    // Act + Assert (second toggle → false)
    service.toggleTodoComplete(id);
    expect(service.todos[0].completed).toBe(false);
  });

  test('should remove a todo', () => {
    // Arrange
    service.addTodo('Remove me');
    const id = service.todos[0].id;

    // Act
    service.removeTodo(id);

    // Assert
    expect(service.todos).toHaveLength(0);
  });

  test('should not add a todo if text is empty', () => {
    // Act
    service.addTodo('');

    // Assert
    expect(service.todos).toHaveLength(0);
  });
});
