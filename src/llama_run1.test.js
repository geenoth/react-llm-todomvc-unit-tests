import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
  const onSaveEdit = jest.fn();
  const onBlur = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders input field with default value', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    expect(getByTestId('edit-todo-input')).toBeInTheDocument();
    expect(getByTestId('edit-todo-input')).toHaveValue('');
  });

  it('renders input field with custom default value', () => {
    const defaultValue = 'Custom default value';
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} defaultValue={defaultValue} />);
    expect(getByTestId('edit-todo-input')).toBeInTheDocument();
    expect(getByTestId('edit-todo-input')).toHaveValue(defaultValue);
  });

  it('calls onSaveEdit with sanitized input value on enter press', () => {
    const inputText = 'Hello World!';
    const sanitizedText = '&amp;Hello World!';

    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onSaveEdit).toHaveBeenCalledTimes(1);
    expect(onSaveEdit).toHaveBeenCalledWith(sanitizedText);
  });

  it('does not call onSaveEdit when input value is empty', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');

    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onSaveEdit).not.toHaveBeenCalled();
  });

  it('does not call onSaveEdit when input value is too short', () => {
    const inputText = 'a';

    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onSaveEdit).not.toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');

    fireEvent.blur(input);

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('sanitizes input value to prevent XSS', () => {
    const inputText = '<script>alert("XSS")</script>';
    const sanitizedText = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';

    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');

    fireEvent.change(input, { target: { value: inputText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });

    expect(onSaveEdit).toHaveBeenCalledTimes(1);
    expect(onSaveEdit).toHaveBeenCalledWith(sanitizedText);
  });
});