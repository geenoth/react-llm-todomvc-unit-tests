import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput component', () => {
  const onSaveEdit = jest.fn();
  const onBlur = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    expect(getByTestId('edit-todo-input')).toBeInTheDocument();
  });

  it('calls onSaveEdit when Enter key is pressed', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onSaveEdit).toHaveBeenCalledTimes(1);
  });

  it('does not call onSaveEdit when Enter key is pressed with empty input', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onSaveEdit).not.toHaveBeenCalled();
  });

  it('does not call onSaveEdit when input is too short', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onSaveEdit).not.toHaveBeenCalled();
  });

  it('sanitizes input before calling onSaveEdit', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'Hello<script>alert("XSS")</script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(onSaveEdit).toHaveBeenCalledTimes(1);
    expect(onSaveEdit).toHaveBeenCalledWith('Hello&lt;script&gt;alert("XSS")&lt;/script&gt;');
  });

  it('calls onBlur when input loses focus', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with default value', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} defaultValue="Default value" />);
    const input = getByTestId('edit-todo-input');
    expect(input.value).toBe('Default value');
  });
});