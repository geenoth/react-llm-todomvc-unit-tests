/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
    let mockOnSaveEdit;
    let mockOnBlur;

    beforeEach(() => {
        mockOnSaveEdit = jest.fn();
        mockOnBlur = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders input with default props', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('id', 'edit-todo-input');
        expect(input).toHaveValue('');
        expect(document.activeElement).toBe(input);
    });

    test('renders input with defaultValue', () => {
        const { getByTestId } = render(
            <EditTodoInput 
                onSaveEdit={mockOnSaveEdit}
                defaultValue="Test todo"
            />
        );
        
        const input = getByTestId('edit-todo-input');
        expect(input).toHaveValue('Test todo');
    });

    test('renders label with correct text and association', () => {
        const { getByLabelText } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByLabelText('Edit Todo Input');
        expect(input).toBeInTheDocument();
    });

    test('calls onSaveEdit with sanitized value when Enter is pressed and value is valid', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        fireEvent.change(input, { target: { value: 'New todo item' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        expect(mockOnSaveEdit).toHaveBeenCalledWith('New todo item');
        expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
    });

    test('does not call onSaveEdit when Enter is pressed and value is too short', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        
        // Test with 1 character
        fireEvent.change(input, { target: { value: 'a' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(mockOnSaveEdit).not.toHaveBeenCalled();
        
        // Test with empty string
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(mockOnSaveEdit).not.toHaveBeenCalled();
        
        // Test with whitespace only
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });

    test('calls onSaveEdit when Enter is pressed with exactly 2 characters', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        fireEvent.change(input, { target: { value: 'ab' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        expect(mockOnSaveEdit).toHaveBeenCalledWith('ab');
    });

    test('trims whitespace before validation', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        fireEvent.change(input, { target: { value: '  Valid todo  ' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        
        expect(mockOnSaveEdit).toHaveBeenCalledWith('Valid todo');
    });

    test('sanitizes HTML special characters', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        
        const testCases = [
            { input: 'Test & test', expected: 'Test &amp; test' },
            { input: 'Test < test', expected: 'Test &lt; test' },
            { input: 'Test > test', expected: 'Test &gt; test' },
            { input: 'Test "quoted"', expected: 'Test &quot;quoted&quot;' },
            { input: "Test 'quoted'", expected: "Test &#x27;quoted&#x27;" },
            { input: 'Test / slash', expected: 'Test &#x2F; slash' },
            { input: '<script>alert("XSS")</script>', expected: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;' }
        ];
        
        testCases.forEach(({ input: testInput, expected }) => {
            fireEvent.change(input, { target: { value: testInput } });
            fireEvent.keyDown(input, { key: 'Enter' });
            expect(mockOnSaveEdit).toHaveBeenCalledWith(expected);
        });
    });

    test('does not call onSaveEdit for non-Enter keys', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        fireEvent.change(input, { target: { value: 'Valid todo' } });
        
        const keys = ['Escape', 'Tab', 'Shift', 'Control', 'Alt', 'a', '1'];
        keys.forEach(key => {
            fireEvent.keyDown(input, { key });
        });
        
        expect(mockOnSaveEdit).not.toHaveBeenCalled();
    });

    test('calls onBlur when input loses focus', () => {
        const { getByTestId } = render(
            <EditTodoInput 
                onSaveEdit={mockOnSaveEdit}
                onBlur={mockOnBlur}
            />
        );
        
        const input = getByTestId('edit-todo-input');
        fireEvent.blur(input);
        
        expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    test('does not throw error when onBlur is not provided', () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const input = getByTestId('edit-todo-input');
        expect(() => fireEvent.blur(input)).not.toThrow();
    });

    test('has correct CSS classes', () => {
        const { container, getByTestId } = render(
            <EditTodoInput onSaveEdit={mockOnSaveEdit} />
        );
        
        const inputContainer = container.querySelector('.input-container');
        expect(inputContainer).toBeInTheDocument();
        
        const input = getByTestId('edit-todo-input');
        expect(input).toHaveClass('edit');
        
        const label = container.querySelector('label');
        expect(label).toHaveClass('visually-hidden');
    });
});