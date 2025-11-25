/**
 * @jest-environment jsdom
 */

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
    const label = screen.getByText('Toggle All Input');
    
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('id', 'toggle-all-checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Toggle all todos');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'toggle-all-checkbox');
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

  test('renders enabled when disabled is false', () => {
    render(<ToggleAllCheckbox disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeDisabled();
  });

  test('calls onToggleAll with true when unchecked checkbox is clicked', () => {
    render(<ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });

  test('calls onToggleAll with false when checked checkbox is clicked', () => {
    render(<ToggleAllCheckbox allCompleted={true} disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(false);
  });

  test('does not call onToggleAll when disabled checkbox is clicked', () => {
    render(<ToggleAllCheckbox disabled={true} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleAll).not.toHaveBeenCalled();
  });

  test('handleChange is memoized with useCallback', () => {
    const { rerender } = render(
      <ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />
    );
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    
    // Rerender with same onToggleAll function
    rerender(<ToggleAllCheckbox allCompleted={true} disabled={false} onToggleAll={mockOnToggleAll} />);
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).toHaveBeenCalledTimes(2);
  });

  test('renders with correct container className', () => {
    const { container } = render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const toggleContainer = container.querySelector('.toggle-all-container');
    expect(toggleContainer).toBeInTheDocument();
  });

  test('checkbox has correct className', () => {
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toHaveClass('toggle-all');
  });

  test('label has correct className', () => {
    render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} />);
    
    const label = screen.getByText('Toggle All Input');
    expect(label).toHaveClass('toggle-all-label');
  });

  test('component renders without onToggleAll prop', () => {
    // This should not throw
    render(<ToggleAllCheckbox />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('calls onToggleAll through change event with event object', () => {
    render(<ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />);
    
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });
    
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });
});