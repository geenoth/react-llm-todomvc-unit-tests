import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
  const onSaveEdit = jest.fn();
  const onBlur = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    expect(getByText('Edit Todo Input')).toBeInTheDocument();
    expect(getByTestId('edit-todo-input')).toBeInTheDocument();
  });

  it('calls onSaveEdit when Enter key is pressed', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onSaveEdit).toHaveBeenCalledTimes(1);
  });

  it('trims input value before calling onSaveEdit', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: '   New todo   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onSaveEdit).toHaveBeenCalledTimes(1);
    expect(onSaveEdit).toHaveBeenCalledWith('New todo');
  });

  it('does not call onSaveEdit when input value is empty', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onSaveEdit).not.toHaveBeenCalled();
  });

  it('does not call onSaveEdit when input value is too short', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onSaveEdit).not.toHaveBeenCalled();
  });

  it('sanitizes input value before calling onSaveEdit', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: '<script>alert("XSS")</script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(onSaveEdit).toHaveBeenCalledTimes(1);
    expect(onSaveEdit).toHaveBeenCalledWith('&lt;script&gt;alert("XSS")&lt;/script&gt;');
  });

  it('calls onBlur when input loses focus', () => {
    const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEdit} onBlur={onBlur} />);
    const input = getByTestId('edit-todo-input');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});