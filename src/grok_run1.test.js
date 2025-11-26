import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe('FilterLink_Completed', () => {
  test('renders the Completed filter link with correct text', () => {
    render(<FilterLink_Completed isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-completed')).toHaveTextContent('Completed');
  });

  test('applies selected class when isActive is true', () => {
    render(<FilterLink_Completed isActive={true} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-completed')).toHaveClass('selected');
  });

  test('does not apply selected class when isActive is false', () => {
    render(<FilterLink_Completed isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-completed')).not.toHaveClass('selected');
  });

  test('calls onFilterChange with "completed" when clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByTestId('filter-link-completed'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });

  test('prevents default behavior on click', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />);
    const link = screen.getByTestId('filter-link-completed');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(link, event);
    expect(event.defaultPrevented).toBe(true);
  });

  test('renders with correct href attribute', () => {
    render(<FilterLink_Completed isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-completed')).toHaveAttribute('href', '#/completed');
  });
});