/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
  const mockOnToggleAll = jest.fn();

  beforeEach(() => {
    mockOnToggleAll.mockClear();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      const { getByTestId, getByLabelText, getByText } = render(
        <ToggleAllCheckbox onToggleAll={mockOnToggleAll} />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveAttribute('id', 'toggle-all-checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Toggle all todos');
      expect(checkbox).toBeDisabled();
      expect(checkbox).not.toBeChecked();

      const checkboxByLabel = getByLabelText('Toggle all todos');
      expect(checkboxByLabel).toBe(checkbox);

      const label = getByText('Toggle All Input');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'toggle-all-checkbox');
      expect(label).toHaveClass('toggle-all-label');
    });

    it('should render with allCompleted true', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox allCompleted={true} onToggleAll={mockOnToggleAll} />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should render with allCompleted false', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox allCompleted={false} onToggleAll={mockOnToggleAll} />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should render with disabled true', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox disabled={true} onToggleAll={mockOnToggleAll} />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should render with disabled false', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox disabled={false} onToggleAll={mockOnToggleAll} />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      expect(checkbox).not.toBeDisabled();
    });

    it('should have correct container class', () => {
      const { container } = render(
        <ToggleAllCheckbox onToggleAll={mockOnToggleAll} />
      );

      const toggleContainer = container.querySelector('.toggle-all-container');
      expect(toggleContainer).toBeInTheDocument();
    });

    it('should have correct checkbox class', () => {
      const { container } = render(
        <ToggleAllCheckbox onToggleAll={mockOnToggleAll} />
      );

      const checkbox = container.querySelector('.toggle-all');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onToggleAll with true when unchecked checkbox is clicked', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      fireEvent.click(checkbox);

      expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAll).toHaveBeenCalledWith(true);
    });

    it('should call onToggleAll with false when checked checkbox is clicked', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox 
          allCompleted={true} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      fireEvent.click(checkbox);

      expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAll).toHaveBeenCalledWith(false);
    });

    it('should not call onToggleAll when checkbox is disabled', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={true}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      fireEvent.click(checkbox);

      expect(mockOnToggleAll).not.toHaveBeenCalled();
    });

    it('should trigger onChange event correctly', () => {
      const { getByTestId } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      fireEvent.change(checkbox, { target: { checked: true } });

      expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAll).toHaveBeenCalledWith(true);
    });

    it('should handle label click', () => {
      const { getByText } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const label = getByText('Toggle All Input');
      fireEvent.click(label);

      expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
      expect(mockOnToggleAll).toHaveBeenCalledWith(true);
    });
  });

  describe('Props validation', () => {
    it('should handle missing onToggleAll prop gracefully', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => {
        render(<ToggleAllCheckbox />);
      }).not.toThrow();

      consoleError.mockRestore();
    });

    it('should update when props change', () => {
      const { getByTestId, rerender } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={true}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toBeDisabled();

      rerender(
        <ToggleAllCheckbox 
          allCompleted={true} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      expect(checkbox).toBeChecked();
      expect(checkbox).not.toBeDisabled();
    });
  });

  describe('Callback optimization', () => {
    it('should maintain callback reference when onToggleAll does not change', () => {
      const { getByTestId, rerender } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      const initialOnChange = checkbox.onchange;

      rerender(
        <ToggleAllCheckbox 
          allCompleted={true} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      expect(checkbox.onchange).toBe(initialOnChange);
    });

    it('should update callback reference when onToggleAll changes', () => {
      const newMockOnToggleAll = jest.fn();
      
      const { getByTestId, rerender } = render(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={false}
          onToggleAll={mockOnToggleAll} 
        />
      );

      const checkbox = getByTestId('toggle-all-checkbox');
      const initialOnChange = checkbox.onchange;

      rerender(
        <ToggleAllCheckbox 
          allCompleted={false} 
          disabled={false}
          onToggleAll={newMockOnToggleAll} 
        />
      );

      expect(checkbox.onchange).not.toBe(initialOnChange);

      fireEvent.click(checkbox);
      expect(newMockOnToggleAll).toHaveBeenCalledWith(true);
      expect(mockOnToggleAll).not.toHaveBeenCalled();
    });
  });
});