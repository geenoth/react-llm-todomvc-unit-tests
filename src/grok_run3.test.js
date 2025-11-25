import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
  test('renders correctly with default props', () => {
    render(<ToggleAllCheckbox />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeDisabled();
    expect(screen.getByText('Toggle All Input')).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-label', 'Toggle all todos');
  });

  test('renders with allCompleted true and enabled', () => {
    render(<ToggleAllCheckbox allCompleted={true} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  test('calls onToggleAll when checkbox is clicked', () => {
    const mockOnToggleAll = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });

  test('does not call onToggleAll when disabled', () => {
    const mockOnToggleAll = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} disabled={true} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).not.toHaveBeenCalled();
  });

  test('updates checked state based on allCompleted prop', () => {
    const { rerender } = render(<ToggleAllCheckbox allCompleted={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<ToggleAllCheckbox allCompleted={true} />);
    expect(checkbox).toBeChecked();
  });

  test('handles keyboard interaction (Enter key)', () => {
    const mockOnToggleAll = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.keyDown(checkbox, { key: 'Enter', code: 'Enter' });
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });

  test('handles keyboard interaction (Space key)', () => {
    const mockOnToggleAll = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });
});