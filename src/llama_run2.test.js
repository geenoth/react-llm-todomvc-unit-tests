import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput component', () => {
  const onAddTodo = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    expect(getByTestId('add-todo-input')).toBeInTheDocument();
  });

  it('calls onAddTodo when Enter key is pressed', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onAddTodo).toHaveBeenCalledTimes(1);
  });

  it('does not call onAddTodo when Enter key is pressed with empty input', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('does not call onAddTodo when input is too short', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('sanitizes input before calling onAdd Todo', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'Hello<script>alert("XSS")</script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onAddTodo).toHaveBeenCalledTimes(1);
    expect(onAddTodo).toHaveBeenCalledWith('Hello&lt;script&gt;alert("XSS")&lt;/script&gt;');
  });

  it('clears input after calling onAddTodo', async () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    await waitFor(() => expect(input.value).toBe(''));
  });

  it('renders with custom placeholder', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} placeholder="Custom placeholder" />);
    const input = getByTestId('add-todo-input');
    expect(input.placeholder).toBe('Custom placeholder');
  });
});