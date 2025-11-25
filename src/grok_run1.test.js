import { render, screen, fireEvent } from '@testing-library/react';
import { FilterLink_Active } from "./10_FilterLink_Active";

describe('FilterLink_Active', () => {
  test('renders the Active filter link with correct text', () => {
    render(<FilterLink_Active isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-active')).toHaveTextContent('Active');
  });

  test('applies selected class when isActive is true', () => {
    render(<FilterLink_Active isActive={true} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-active')).toHaveClass('selected');
  });

  test('does not apply selected class when isActive is false', () => {
    render(<FilterLink_Active isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-active')).not.toHaveClass('selected');
  });

  test('calls onFilterChange with "active" when clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />);
    fireEvent.click(screen.getByTestId('filter-link-active'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');
  });

  test('prevents default behavior on click', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />);
    const link = screen.getByTestId('filter-link-active');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(link, event);
    expect(event.defaultPrevented).toBe(true);
  });

  test('renders with correct href attribute', () => {
    render(<FilterLink_Active isActive={false} onFilterChange={() => {}} />);
    expect(screen.getByTestId('filter-link-active')).toHaveAttribute('href', '#/active');
  });
});