/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddTodoInput } from './01_AddTodoInput';

describe('AddTodoInput', () => {
  let mockOnAddTodo;

  beforeEach(() => {
    mockOnAddTodo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders input with default placeholder', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'What needs to be done?');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('id', 'add-todo-input');
      expect(input).toHaveAttribute('autofocus');
    });

    test('renders input with custom placeholder', () => {
      const customPlaceholder = 'Add your task here';
      render(<AddTodoInput onAddTodo={mockOnAddTodo} placeholder={customPlaceholder} />);
      
      const input = screen.getByTestId('add-todo-input');
      expect(input).toHaveAttribute('placeholder', customPlaceholder);
    });

    test('renders label for accessibility', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const label = screen.getByText('Add Todo Input');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'add-todo-input');
      expect(label).toHaveClass('visually-hidden');
    });

    test('renders container div with correct class', () => {
      const { container } = render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const containerDiv = container.querySelector('.input-container');
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('calls onAddTodo when Enter is pressed with valid input', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      fireEvent.change(input, { target: { value: 'New todo item' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
      expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item');
      expect(input.value).toBe('');
    });

    test('trims whitespace from input value', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      fireEvent.change(input, { target: { value: '  Trimmed todo  ' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(mockOnAddTodo).toHaveBeenCalledWith('Trimmed todo');
    });

    test('does not call onAddTodo when input is too short', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      
      // Test with 1 character
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(mockOnAddTodo).not.toHaveBeenCalled();
      expect(input.value).toBe('a');

      // Test with empty string
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(mockOnAddTodo).not.toHaveBeenCalled();

      // Test with only whitespace
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    test('does not call onAddTodo when non-Enter key is pressed', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      fireEvent.change(input, { target: { value: 'Valid todo' } });
      
      fireEvent.keyDown(input, { key: 'Escape' });
      fireEvent.keyDown(input, { key: 'a' });
      fireEvent.keyDown(input, { key: 'Tab' });
      
      expect(mockOnAddTodo).not.toHaveBeenCalled();
      expect(input.value).toBe('Valid todo');
    });

    test('sanitizes HTML special characters', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      
      const testCases = [
        { input: 'Test & test', expected: 'Test &amp; test' },
        { input: '<script>alert("xss")</script>', expected: '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;' },
        { input: 'Test > than', expected: 'Test &gt; than' },
        { input: 'Test < than', expected: 'Test &lt; than' },
        { input: 'Test "quotes"', expected: 'Test &quot;quotes&quot;' },
        { input: "Test 'quotes'", expected: "Test &#x27;quotes&#x27;" },
        { input: 'Test/slash', expected: 'Test&#x2F;slash' }
      ];

      testCases.forEach(({ input: inputValue, expected }) => {
        fireEvent.change(input, { target: { value: inputValue } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        expect(mockOnAddTodo).toHaveBeenCalledWith(expected);
        mockOnAddTodo.mockClear();
      });
    });

    test('clears input after successful submission', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      fireEvent.change(input, { target: { value: 'Todo to clear' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(input.value).toBe('');
    });

    test('allows multiple todo submissions', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      
      fireEvent.change(input, { target: { value: 'First todo' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      fireEvent.change(input, { target: { value: 'Second todo' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(mockOnAddTodo).toHaveBeenCalledTimes(2);
      expect(mockOnAddTodo).toHaveBeenNthCalledWith(1, 'First todo');
      expect(mockOnAddTodo).toHaveBeenNthCalledWith(2, 'Second todo');
    });
  });

  describe('Edge Cases', () => {
    test('handles exactly 2 characters (minimum valid length)', () => {
      render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      fireEvent.change(input, { target: { value: 'ab' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(mockOnAddTodo).toHaveBeenCalledWith('ab');
    });

    test('maintains callback reference when onAddTodo prop changes', () => {
      const { rerender } = render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
      
      const input = screen.getByTestId('add-todo-input');
      fireEvent.change(input, { target: { value: 'Test todo' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
      
      const newMockOnAddTodo = jest.fn();
      rerender(<AddTodoInput onAddTodo={newMockOnAddTodo} />);
      
      fireEvent.change(input, { target: { value: 'Another todo' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(newMockOnAddTodo).toHaveBeenCalledTimes(1);
      expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    });
  });
});