import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput', () => {
  const onAddTodo = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    expect(getByText('What needs to be done?')).toBeInTheDocument();
    expect(getByTestId('add-todo-input')).toBeInTheDocument();
  });

  it('calls onAddTodo when Enter key is pressed', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onAddTodo).toHaveBeenCalledTimes(1);
  });

  it('trims input value before calling onAddTodo', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: '   New todo   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onAddTodo).toHaveBeenCalledTimes(1);
    expect(onAddTodo).toHaveBeenCalledWith('New todo');
  });

  it('does not call onAddTodo when input value is empty', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('does not call onAddTodo when input value is too short', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('sanitizes input value before calling onAddTodo', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: '<script>alert("XSS")</script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onAddTodo).toHaveBeenCalledTimes(1);
    expect(onAddTodo).toHaveBeenCalledWith('&lt;script&gt;alert("XSS")&lt;/script&gt;');
  });

  it('resets input value after calling onAddTodo', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(input.value).toBe('');
  });
});