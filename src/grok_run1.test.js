import { render, screen, fireEvent } from '@testing-library/react';
import { FilterLink_All } from "./09_FilterLink_All";

describe('FilterLink_All Component', () => {
  test('renders the "All" filter link with correct text', () => {
    render(<FilterLink_All isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-all')).toHaveTextContent('All');
  });

  test('applies "selected" class when isActive is true', () => {
    render(<FilterLink_All isActive={true} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-all')).toHaveClass('selected');
  });

  test('does not apply "selected" class when isActive is false', () => {
    render(<FilterLink_All isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-all')).not.toHaveClass('selected');
  });

  test('calls onFilterChange with "all" when clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByTestId('filter-link-all'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');
  });

  test('prevents default behavior on click', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />);
    const link = screen.getByTestId('filter-link-all');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(link, event);
    expect(event.defaultPrevented).toBe(true);
  });

  test('renders with correct href attribute', () => {
    render(<FilterLink_All isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-all')).toHaveAttribute('href', '#/');
  });
});