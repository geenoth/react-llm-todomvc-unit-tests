import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput', () => {
  const onAddTodo = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders input field with default placeholder', () => {
    const { getByPlaceholderText } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    expect(getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('renders input field with custom placeholder', () => {
    const customPlaceholder = 'Custom placeholder';
    const { getByPlaceholderText } = render(<AddTodoInput onAddTodo={onAddTodo} placeholder={customPlaceholder} />);
    expect(getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  it('calls onAddTodo with sanitized input value on enter press', () => {
    const inputText = 'Hello World!';
    const sanitizedText = '&amp;Hello World!';

    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onAddTodo).toHaveBeenCalledTimes(1);
    expect(onAddTodo).toHaveBeenCalledWith(sanitizedText);
    expect(input.value).toBe('');
  });

  it('does not call onAddTodo when input value is empty', () => {
    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');

    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('does not call onAddTodo when input value is too short', () => {
    const inputText = 'a';

    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('sanitizes input value to prevent XSS', () => {
    const inputText = '<script>alert("XSS")</script>';
    const sanitizedText = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';

    const { getByTestId } = render(<AddTodoInput onAddTodo={onAddTodo} />);
    const input = getByTestId('add-todo-input');

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onAddTodo).toHaveBeenCalledTimes(1);
    expect(onAddTodo).toHaveBeenCalledWith(sanitizedText);
  });
});