const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
  // Launch the Electron app
  const electronApp = await electron.launch({ args: ['.'] });
  const window = await electronApp.firstWindow();

  const taskText = 'My new E2E test task';

  // --- Task 1: Add a new todo item ---
  // Arrange
  const input = window.locator('#todo-input');
  const addButton = window.getByRole('button', { name: /add/i });

  // Act
  await input.fill(taskText);
  await addButton.click();

  // --- Task 2: Verify the todo item was added ---
  const todoItem = window.locator('.todo-item', { hasText: taskText }).first();

  // Assert
  await expect(todoItem).toBeVisible();
  await expect(todoItem).toContainText(taskText);

  // --- Task 3: Mark the todo item as complete ---
  const checkbox = todoItem.locator('input[type="checkbox"]');
  await checkbox.check(); // Act
  await expect(todoItem).toHaveClass(/completed/); // Assert

  // --- Task 4: Delete the todo item ---
  const deleteButton = todoItem.getByRole('button', { name: /delete/i });
  await deleteButton.click(); // Act

  // Assert – re-query to avoid stale handles after deletion
  const itemAfterDelete = window.locator('.todo-item', { hasText: taskText });
  await expect(itemAfterDelete).toHaveCount(0);

  // Close the app
  await electronApp.close();
});
