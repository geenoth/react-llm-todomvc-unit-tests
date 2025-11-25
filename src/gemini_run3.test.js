import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
    // Test 1: Component renders correctly with default props
    test('renders the input element with a default value', () => {
        render(<EditTodoInput onSaveEdit={() => {}} />);
        const inputElement = screen.getByTestId('edit-todo-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass('edit');
        expect(inputElement).toHaveValue('');
        expect(inputElement).toHaveFocus();
    });

    // Test 2: Renders with a specific defaultValue prop
    test('renders with a given defaultValue', () => {
        const defaultValue = 'Initial todo text';
        render(<EditTodoInput onSaveEdit={() => {}} defaultValue={defaultValue} />);
        const inputElement = screen.getByTestId('edit-todo-input');
        expect(inputElement).toHaveValue(defaultValue);
    });

    // Test 3: Calls onSaveEdit when "Enter" is pressed with valid input
    test('calls onSaveEdit with trimmed value when Enter is pressed and input is valid', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue="  Some todo  " />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
        expect(mockOnSaveEdit).toHaveBeenCalledWith('Some todo');
    });

    // Test 4: Does not call onSaveEdit when "Enter" is pressed with invalid (short) input
    test('does not call onSaveEdit when Enter is pressed and input is too short', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue=" a " />);
        const inputElement = screen.getByTestId('edit-todo-input');

        // Simulate user typing a single character
        fireEvent.change(inputElement, { target: { value: 'a' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });

    // Test 5: Does not call onSaveEdit for other key presses
    test('does not call onSaveEdit on key presses other than Enter', () => {
        const mockOnSaveEdit = jest.fn();
        render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue="Some value" />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Escape', code: 'Escape' });
        fireEvent.keyDown(inputElement, { key: 'a', code: 'KeyA' });

        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });

    // Test 6: Calls onBlur when the input loses focus
    test('calls onBlur when input loses focus', () => {
        const mockOnBlur = jest.fn();
        render(<EditTodoInput onSaveEdit={() => {}} onBlur={mockOnBlur} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.blur(inputElement);

        expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    // Test 7: Handles blur event gracefully when onBlur prop is not provided
    test('does not throw error on blur when onBlur prop is not provided', () => {
        render(<EditTodoInput onSaveEdit={() => {}} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        expect(() => fireEvent.blur(inputElement)).not.toThrow();
    });

    // Test 8: Sanitizes input before calling onSaveEdit
    test('sanitizes input before calling onSaveEdit', () => {
        const mockOnSaveEdit = jest.fn();
        const maliciousString = '<script>alert("xss")</script>';
        const sanitizedString = '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;';

        render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.change(inputElement, { target: { value: maliciousString } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
        expect(mockOnSaveEdit).toHaveBeenCalledWith(sanitizedString);
    });

    // Test 9: Input value is updated by user typing
    test('allows user to change the input value', () => {
        const newText = 'Updated todo';
        render(<EditTodoInput onSaveEdit={() => {}} defaultValue="Initial" />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.change(inputElement, { target: { value: newText } });

        expect(inputElement).toHaveValue(newText);
    });
});