import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTodoInput } from './02_EditTodoInput'; // Assuming the component is in this file

describe('EditTodoInput', () => {
    let onSaveEditMock;
    let onBlurMock;

    beforeEach(() => {
        // Reset mocks before each test
        onSaveEditMock = jest.fn();
        onBlurMock = jest.fn();
    });

    // Test case 1: Correct Rendering
    test('should render the input element with the provided default value', () => {
        const defaultValue = 'Initial todo text';
        render(<EditTodoInput defaultValue={defaultValue} onSaveEdit={onSaveEditMock} />);

        const inputElement = screen.getByTestId('edit-todo-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue(defaultValue);
        expect(inputElement).toHaveClass('edit');
    });

    // Test case 2: autoFocus attribute
    test('should have autoFocus on the input element', () => {
        render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');
        expect(inputElement).toHaveFocus();
    });

    // Test case 3: Enter key press with valid input
    test('should call onSaveEdit with trimmed value when Enter is pressed and input is valid', () => {
        render(<EditTodoInput defaultValue="  A valid task   " onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(onSaveEditMock).toHaveBeenCalledTimes(1);
        expect(onSaveEditMock).toHaveBeenCalledWith('A valid task');
    });

    // Test case 4: Enter key press with input that needs sanitization
    test('should call onSaveEdit with sanitized value on Enter key press', () => {
        const maliciousString = '<script>alert("XSS")</script>';
        const sanitizedString = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;';
        render(<EditTodoInput defaultValue={maliciousString} onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(onSaveEditMock).toHaveBeenCalledTimes(1);
        expect(onSaveEditMock).toHaveBeenCalledWith(sanitizedString);
    });

    // Test case 5: Enter key press with invalid input (too short)
    test('should not call onSaveEdit when Enter is pressed and input is less than 2 characters', () => {
        render(<EditTodoInput defaultValue="a" onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    // Test case 6: Enter key press with invalid input (only whitespace)
    test('should not call onSaveEdit when Enter is pressed and input is only whitespace', () => {
        render(<EditTodoInput defaultValue="   " onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    // Test case 7: Non-Enter key press
    test('should not call onSaveEdit when a key other than Enter is pressed', () => {
        render(<EditTodoInput defaultValue="some text" onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.keyDown(inputElement, { key: 'a', code: 'KeyA' });
        fireEvent.keyDown(inputElement, { key: 'Shift', code: 'ShiftLeft' });

        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    // Test case 8: onBlur event handling
    test('should call onBlur when the input loses focus', () => {
        render(<EditTodoInput onBlur={onBlurMock} onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        fireEvent.blur(inputElement);

        expect(onBlurMock).toHaveBeenCalledTimes(1);
    });

    // Test case 9: onBlur prop is not provided
    test('should not throw an error on blur if the onBlur prop is not provided', () => {
        render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        // This test passes if fireEvent.blur does not throw an error
        expect(() => fireEvent.blur(inputElement)).not.toThrow();
    });

    // Test case 10: Full user interaction flow
    test('should update value on change and save on Enter', () => {
        render(<EditTodoInput defaultValue="Initial" onSaveEdit={onSaveEditMock} />);
        const inputElement = screen.getByTestId('edit-todo-input');

        // Simulate user typing
        fireEvent.change(inputElement, { target: { value: 'Updated task' } });
        expect(inputElement).toHaveValue('Updated task');

        // Simulate pressing Enter
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
        expect(onSaveEditMock).toHaveBeenCalledTimes(1);
        expect(onSaveEditMock).toHaveBeenCalledWith('Updated task');
    });
});