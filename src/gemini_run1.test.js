import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput', () => {
    // Test 1: Component renders correctly with default props
    test('renders the input field with the default placeholder', () => {
        render(<AddTodoInput onAddTodo={() => {}} />);
        const inputElement = screen.getByTestId('add-todo-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('placeholder', 'What needs to be done?');
        expect(inputElement).toHaveFocus();
    });

    // Test 2: Component renders with a custom placeholder
    test('renders with a custom placeholder when provided', () => {
        const customPlaceholder = 'Add a new task here';
        render(<AddTodoInput onAddTodo={() => {}} placeholder={customPlaceholder} />);
        const inputElement = screen.getByTestId('add-todo-input');
        expect(inputElement).toHaveAttribute('placeholder', customPlaceholder);
    });

    // Test 3: User can type in the input field
    test('allows user to type in the input field', () => {
        render(<AddTodoInput onAddTodo={() => {}} />);
        const inputElement = screen.getByTestId('add-todo-input');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        expect(inputElement.value).toBe('New Todo');
    });

    // Test 4: Pressing "Enter" with valid input calls onAddTodo and clears the input
    test('calls onAddTodo and clears the input on Enter key press with valid text', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId('add-todo-input');

        fireEvent.change(inputElement, { target: { value: '  A valid todo  ' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith('A valid todo');
        expect(inputElement.value).toBe('');
    });

    // Test 5: Input is sanitized before being passed to onAddTodo
    test('sanitizes input before calling onAddTodo', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId('add-todo-input');
        const maliciousString = '<script>alert("xss")</script>';
        const sanitizedString = '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;';

        fireEvent.change(inputElement, { target: { value: maliciousString } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith(sanitizedString);
    });

    // Test 6: Pressing "Enter" with input less than 2 characters does not call onAddTodo
    test('does not call onAddTodo if input length is less than 2', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId('add-todo-input');

        fireEvent.change(inputElement, { target: { value: 'a' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
        expect(inputElement.value).toBe('a'); // Value should not be cleared
    });

    // Test 7: Pressing "Enter" with only whitespace does not call onAddTodo
    test('does not call onAddTodo if input is only whitespace', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId('add-todo-input');

        fireEvent.change(inputElement, { target: { value: '   ' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    // Test 8: Pressing a key other than "Enter" does not call onAddTodo
    test('does not call onAddTodo on a key press that is not Enter', () => {
        const mockOnAddTodo = jest.fn();
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId('add-todo-input');

        fireEvent.change(inputElement, { target: { value: 'Some text' } });
        fireEvent.keyDown(inputElement, { key: 'A', code: 'KeyA' });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    // Test 9: Label is visually hidden but accessible
    test('has a visually hidden label for accessibility', () => {
        render(<AddTodoInput onAddTodo={() => {}} />);
        const labelElement = screen.getByText('Add Todo Input');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveClass('visually-hidden');
        const inputElement = screen.getByLabelText('Add Todo Input');
        expect(inputElement).toBeInTheDocument();
    });
});