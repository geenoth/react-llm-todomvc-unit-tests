import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
  test('should render without crashing', () => {
    render(<ToggleAllCheckbox onToggleAll={() => {}} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('should be disabled and unchecked by default', () => {
    render(<ToggleAllCheckbox onToggleAll={() => {}} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  test('should be enabled when disabled prop is false', () => {
    render(<ToggleAllCheckbox onToggleAll={() => {}} disabled={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeDisabled();
  });

  test('should be checked when allCompleted prop is true', () => {
    render(<ToggleAllCheckbox onToggleAll={() => {}} allCompleted={true} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).toBeChecked();
  });

  test('should be unchecked when allCompleted prop is false', () => {
    render(<ToggleAllCheckbox onToggleAll={() => {}} allCompleted={false} />);
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('should call onToggleAll with true when an unchecked checkbox is clicked', () => {
    const mockOnToggleAll = jest.fn();
    render(
      <ToggleAllCheckbox
        onToggleAll={mockOnToggleAll}
        allCompleted={false}
        disabled={false}
      />
    );
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });

  test('should call onToggleAll with false when a checked checkbox is clicked', () => {
    const mockOnToggleAll = jest.fn();
    render(
      <ToggleAllCheckbox
        onToggleAll={mockOnToggleAll}
        allCompleted={true}
        disabled={false}
      />
    );
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(false);
  });

  test('should not call onToggleAll when a disabled checkbox is clicked', () => {
    const mockOnToggleAll = jest.fn();
    render(
      <ToggleAllCheckbox onToggleAll={mockOnToggleAll} disabled={true} />
    );
    const checkbox = screen.getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggleAll).not.toHaveBeenCalled();
  });

  test('should render the label correctly', () => {
    render(<ToggleAllCheckbox onToggleAll={() => {}} />);
    const label = screen.getByText('Toggle All Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'toggle-all-checkbox');
  });

  test('clicking the label should toggle the checkbox state', () => {
    const mockOnToggleAll = jest.fn();
    render(
      <ToggleAllCheckbox
        onToggleAll={mockOnToggleAll}
        allCompleted={false}
        disabled={false}
      />
    );
    const label = screen.getByText('Toggle All Input');
    fireEvent.click(label);
    expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    expect(mockOnToggleAll).toHaveBeenCalledWith(true);
  });
});