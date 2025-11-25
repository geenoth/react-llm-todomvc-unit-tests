import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
  test('renders correctly with default props', () => {
    render(<ToggleAllCheckbox />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Toggle all todos');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeDisabled();
    expect(screen.getByText('Toggle All Input')).toBeInTheDocument();
  });

  test('renders with allCompleted true', () => {
    render(<ToggleAllCheckbox allCompleted={true} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeChecked();
  });

  test('renders with disabled false', () => {
    render(<ToggleAllCheckbox disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeDisabled();
  });

  test('calls onToggleAll when checkbox is clicked', () => {
    const onToggleAllMock = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={onToggleAllMock} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(onToggleAllMock).toHaveBeenCalledWith(true);
  });

  test('does not call onToggleAll when disabled', () => {
    const onToggleAllMock = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={onToggleAllMock} disabled={true} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(onToggleAllMock).not.toHaveBeenCalled();
  });

  test('toggles checkbox state correctly via props', () => {
    const { rerender } = render(<ToggleAllCheckbox allCompleted={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<ToggleAllCheckbox allCompleted={true} />);
    expect(checkbox).toBeChecked();
  });

  test('handles keyboard interaction (Enter key)', () => {
    const onToggleAllMock = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={onToggleAllMock} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.keyDown(checkbox, { key: 'Enter', code: 'Enter' });
    expect(onToggleAllMock).toHaveBeenCalledWith(true);
  });

  test('handles keyboard interaction (Space key)', () => {
    const onToggleAllMock = jest.fn();
    render(<ToggleAllCheckbox onToggleAll={onToggleAllMock} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' });
    expect(onToggleAllMock).toHaveBeenCalledWith(true);
  });
});