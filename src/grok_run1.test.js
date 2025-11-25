import { render, screen, fireEvent } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel Component', () => {
  const mockOnEdit = jest.fn();
  const defaultProps = {
    title: 'Test Todo',
    onEdit: mockOnEdit,
    todoId: '123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the todo label with the correct title', () => {
    render(<TodoLabel {...defaultProps} />);
    expect(screen.getByTestId('todo-label')).toHaveTextContent('Test Todo');
  });

  test('renders with empty title when title prop is not provided', () => {
    render(<TodoLabel onEdit={mockOnEdit} todoId="123" />);
    expect(screen.getByTestId('todo-label')).toHaveTextContent('');
  });

  test('calls onEdit with todoId on double click', () => {
    render(<TodoLabel {...defaultProps} />);
    const label = screen.getByTestId('todo-label');
    fireEvent.doubleClick(label);
    expect(mockOnEdit).toHaveBeenCalledWith('123');
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test('does not call onEdit when onEdit prop is not provided', () => {
    render(<TodoLabel title="Test Todo" todoId="123" />);
    const label = screen.getByTestId('todo-label');
    fireEvent.doubleClick(label);
    expect(mockOnEdit).not.toHaveBeenCalled();
  });

  test('has correct role and tabIndex for accessibility', () => {
    render(<TodoLabel {...defaultProps} />);
    const label = screen.getByTestId('todo-label');
    expect(label).toHaveAttribute('role', 'button');
    expect(label).toHaveAttribute('tabIndex', '0');
  });

  test('calls onEdit with todoId on Enter key press for accessibility', () => {
    render(<TodoLabel {...defaultProps} />);
    const label = screen.getByTestId('todo-label');
    fireEvent.keyDown(label, { key: 'Enter', code: 'Enter' });
    expect(mockOnEdit).toHaveBeenCalledWith('123');
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test('calls onEdit with todoId on Space key press for accessibility', () => {
    render(<TodoLabel {...defaultProps} />);
    const label = screen.getByTestId('todo-label');
    fireEvent.keyDown(label, { key: ' ', code: 'Space' });
    expect(mockOnEdit).toHaveBeenCalledWith('123');
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test('does not call onEdit on unrelated key press', () => {
    render(<TodoLabel {...defaultProps} />);
    const label = screen.getByTestId('todo-label');
    fireEvent.keyDown(label, { key: 'Escape', code: 'Escape' });
    expect(mockOnEdit).not.toHaveBeenCalled();
  });
});