import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodoInput } from './01_AddTodoInput';

describe('AddTodoInput component', () => {
    // Test 1: Component renders correctly with default props
    test('should render the input field with the default placeholder', () => {
        render(<AddTodoInput onAddTodo={() => {}} />);

        const inputElement = screen.getByTestId('add-todo-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('placeholder', 'What needs to be done?');
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveFocus();
    });

    // Test 2: Renders with a custom placeholder
    test('should render the input field with a custom placeholder', () => {
        const customPlaceholder = "Add a new task";
        render(<AddTodoInput onAddTodo={() => {}} placeholder={customPlaceholder} />);

        const inputElement = screen.getByTestId('add-todo-input');
        expect(inputElement).toHaveAttribute('placeholder', customPlaceholder);
    });

    // Test 3: Calls onAddTodo with trimmed value on Enter key press
    test('should call onAddTodo with the trimmed value when Enter is pressed and the input is valid', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const inputElement = screen.getByTestId('add-todo-input');
        const todoText = '  My new todo   ';
        const trimmedTodoText = 'My new todo';

        fireEvent.change(inputElement, { target: { value: todoText } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith(trimmedTodoText);
    });

    // Test 4: Clears the input field after a successful submission
    test('should clear the input field after Enter is pressed with a valid value', () => {
        render(<AddTodoInput onAddTodo={() => {}} />);

        const inputElement = screen.getByTestId('add-todo-input');
        
        fireEvent.change(inputElement, { target: { value: 'A valid todo' } });
        expect(inputElement.value).toBe('A valid todo');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
        expect(inputElement.value).toBe('');
    });

    // Test 5: Does not call onAddTodo if the input is too short (less than 2 chars)
    test('should not call onAddTodo if the trimmed input value is less than 2 characters long', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const inputElement = screen.getByTestId('add-todo-input');
        
        // Test with a single character
        fireEvent.change(inputElement, { target: { value: 'a' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
        
        expect(mockOnAddTodo).not.toHaveBeenCalled();
        expect(inputElement.value).toBe('a'); // Input should not be cleared

        // Test with a single character surrounded by spaces
        fireEvent.change(inputElement, { target: { value: '  b  ' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
        expect(inputElement.value).toBe('  b  '); // Input should not be cleared
    });

    // Test 6: Does not call onAddTodo for empty or whitespace-only input
    test('should not call onAddTodo if the input is empty or only contains whitespace', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const inputElement = screen.getByTestId('add-todo-input');

        // Test with empty string
        fireEvent.change(inputElement, { target: { value: '' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
        expect(mockOnAddTodo).not.toHaveBeenCalled();

        // Test with only whitespace
        fireEvent.change(inputElement, { target: { value: '   ' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    // Test 7: Does not call onAddTodo if a key other than Enter is pressed
    test('should not call onAddTodo when a key other than Enter is pressed', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const inputElement = screen.getByTestId('add-todo-input');

        fireEvent.change(inputElement, { target: { value: 'Some text' } });
        fireEvent.keyDown(inputElement, { key: 'a', code: 'KeyA' });
        fireEvent.keyDown(inputElement, { key: 'Shift', code: 'ShiftLeft' });
        fireEvent.keyDown(inputElement, { key: 'Escape', code: 'Escape' });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    // Test 8: Sanitizes input before calling onAddTodo
    test('should sanitize the input before calling onAddTodo', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const inputElement = screen.getByTestId('add-todo-input');
        const maliciousInput = '<script>alert("xss")</script>';
        const sanitizedInput = '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;';

        fireEvent.change(inputElement, { target: { value: maliciousInput } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith(sanitizedInput);
    });

    // Test 9: Handles special characters correctly
    test('should handle various special characters for sanitization', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId('add-todo-input');

        const specialCharsInput = `Todo with "&<>'/" chars`;
        const sanitizedSpecialChars = `Todo with &quot;&amp;&lt;&gt;&#x27;&#x2F;&quot; chars`;

        fireEvent.change(inputElement, { target: { value: specialCharsInput } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith(sanitizedSpecialChars);
    });
});