import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
  const mockOnToggleAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    const label = screen.getByLabelText('Toggle all todos');
    
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    expect(label).toBeInTheDocument();
  });

  test('renders with allCompleted true', () => {
    render(<ToggleAllCheckbox allCompleted={true} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeChecked();
  });

  test('renders with allCompleted false', () => {
    render(<ToggleAllCheckbox allCompleted={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('renders enabled when disabled prop is false', () => {
    render(<ToggleAllCheckbox disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeDisabled();
  });

  test('renders disabled when disabled prop is true', () => {
    render(<ToggleAllCheckbox disabled={true} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('calls onToggleAll with true when checking the checkbox', () => {
    render(<ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });

  test('calls onToggleAll with false when unchecking the checkbox', () => {
    render(<ToggleAllCheckbox allCompleted={true} disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(false);
  });

  test('does not call onToggleAll when checkbox is disabled', () => {
    render(<ToggleAllCheckbox allCompleted={false} disabled={true} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).not.toHaveBeenCalled();
  });

  test('renders correct label text', () => {
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const label = screen.getByText('Toggle All Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'toggle-all-checkbox');
  });

  test('has correct classes', () => {
    const { container } = render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const toggleContainer = container.querySelector('.toggle-all-container');
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    const label = container.querySelector('.toggle-all-label');
    
    expect(toggleContainer).toBeInTheDocument();
    expect(checkbox).toHaveClass('toggle-all');
    expect(label).toHaveClass('toggle-all-label');
  });

  test('has correct accessibility attributes', () => {
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Toggle all todos');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('id', 'toggle-all-checkbox');
  });

  test('updates callback when onToggleAll prop changes', () => {
    const newMockOnToggleAll = jest.fn();
    const { rerender } = render(<ToggleAllCheckbox disabled={false} onToggleAll={mockOnToggleAll} />);
    
    rerender(<ToggleAllCheckbox disabled={false} onToggleAll={newMockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).not.toHaveBeenCalled();
    expect(newMockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(newMockOnToggleAll).toHaveBeenCalledWith(true);
  });

  test('handles onChange event correctly', () => {
    render(<ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    const changeEvent = { target: { checked: true } };
    
    fireEvent.change(checkbox, changeEvent);
    
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });
});