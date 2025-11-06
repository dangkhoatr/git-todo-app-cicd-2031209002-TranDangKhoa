const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

const mockView = {
  update: jest.fn(),
  bindAddTodo: jest.fn(),
  bindToggleTodo: jest.fn(),
  bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
  let service;
  let controller;

  beforeEach(() => {
    service = new TodoService();
    service.todos = [];       // reset state
    jest.clearAllMocks();
    controller = new Controller(service, mockView);
  });

  test('handleAddTodo should add a todo to the model', () => {
    // Arrange
    const text = 'Do homework';

    // Act
    controller.handleAddTodo(text);

    // Assert
    expect(service.todos).toHaveLength(1);
    expect(service.todos[0].text).toBe(text);
    expect(service.todos[0].completed).toBe(false);
    expect(service.todos[0].id).toBeDefined();
    // Không assert view.update vì Controller có thể không gọi ở flow này
  });

  test('handleRemoveTodo should remove a todo from the model', () => {
    // Arrange
    // Thêm trước bằng chính controller để đúng luồng
    controller.handleAddTodo('Temp item');
    const id = service.todos[0].id;

    // Act
    controller.handleRemoveTodo(id);

    // Assert
    expect(service.todos).toHaveLength(0);
  });
});
