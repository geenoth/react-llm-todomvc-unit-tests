import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
    // Test 1: Correct rendering with default props
    test('renders the input element with default value', () => {
        render(<EditTodoInput onSaveEdit={() => {}} />);
        const inputElement = screen.getByTestId('edit-todo-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass('edit');
        expect(inputElement).toHaveValue('');
        expect(inputElement).toHaveFocus();
    });

    // Test 2: Rendering with a specific defaultValue
    test('renders with a given defaultValue', () => {
        const defaultValue = 'Initial Todo';
        render(<EditTodoInput defaultValue={defaultValue} onSaveEdit={() => {}} />);
        const inputElement = screen.getByTestId('edit-todo-input');
        expect(inputElement).toHaveValue(defaultValue);
    });

    // Test 3: Calling onSaveEdit on "Enter" with valid input
    test('calls onSaveEdit with trimmed value when Enter is pressed with valid input', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput defaultValue="  My new task  " onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
        expect(mockOnSaveEdit).toHaveBeenCalledWith('My new task');
    });

    // Test 4: Not calling onSaveEdit on "Enter" with invalid input (too short)
    test('does not call onSaveEdit when Enter is pressed with input less than 2 characters', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput defaultValue=" a " onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });
    
    // Test 5: Not calling onSaveEdit on "Enter" with empty input
    test('does not call onSaveEdit when Enter is pressed with only whitespace input', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput defaultValue="   " onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });

    // Test 6: Not calling onSaveEdit for other key presses
    test('does not call onSaveEdit when a key other than Enter is pressed', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput defaultValue="Some text" onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'a', code: 'KeyA' });

        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });

    // Test 7: Sanitizing input before saving
    test('sanitizes the input value before calling onSaveEdit', () => {
        const mockOnSaveEdit = jest.fn();
        const maliciousString = '<script>alert("xss")</script>';
        const sanitizedString = '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;';

        render(<EditTodoInput defaultValue={maliciousString} onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
        expect(mockOnSaveEdit).toHaveBeenCalledWith(sanitizedString);
    });

    // Test 8: Calling onBlur when the input loses focus
    test('calls onBlur when the input element loses focus', () => {
        const mockOnBlur = jest.fn();
        render(<EditTodoInput onSaveEdit={() => {}} onBlur={mockOnBlur} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.blur(inputElement);

        expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    // Test 9: Not throwing an error if onBlur is not provided
    test('does not throw an error on blur if onBlur prop is not provided', () => {
        render(<EditTodoInput onSaveEdit={() => {}} />);
        const inputElement = screen.getByTestId('edit-todo-input');
        
        // This should not throw an error
        expect(() => fireEvent.blur(inputElement)).not.toThrow();
    });
    
    // Test 10: User typing in the input and then saving
    test('updates value on change and saves on Enter', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput defaultValue="Initial" onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        // Simulate user clearing the input and typing something new
        fireEvent.change(inputElement, { target: { value: 'Updated task' } });
        expect(inputElement).toHaveValue('Updated task');

        // Simulate pressing Enter
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
        expect(mockOnSaveEdit).toHaveBeenCalledWith('Updated task');
    });
});