import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ToggleAllCheckbox />);
    expect(getByTestId('toggle-all-checkbox')).toBeInTheDocument();
    expect(getByTestId('toggle-all-checkbox')).toBeDisabled();
  });

  it('renders with correct label', () => {
    const { getByText } = render(<ToggleAllCheckbox />);
    expect(getByText('Toggle All Input')).toBeInTheDocument();
  });

  it('calls onChange callback with correct value on click', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<ToggleAllCheckbox onToggleAll={onChangeMock} disabled={false} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('calls onChange callback with correct value on key press', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<ToggleAllCheckbox onToggleAll={onChangeMock} disabled={false} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.keyDown(checkbox, { key: ' ', code: 32 });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('calls onChange callback with correct value on change', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<ToggleAllCheckbox onToggleAll={onChangeMock} disabled={false} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('toggles checkbox on click', () => {
    const { getByTestId } = render(<ToggleAllCheckbox allCompleted={false} disabled={false} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('renders as checked when allCompleted is true', () => {
    const { getByTestId } = render(<ToggleAllCheckbox allCompleted={true} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    expect(checkbox.checked).toBe(true);
  });

  it('renders as disabled when disabled prop is true', () => {
    const { getByTestId } = render(<ToggleAllCheckbox disabled={true} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    expect(checkbox.disabled).toBe(true);
  });

  it('does not call onChange callback when disabled', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<ToggleAllCheckbox onToggleAll={onChangeMock} disabled={true} />);
    const checkbox = getByTestId('toggle-all-checkbox');
    fireEvent.click(checkbox);
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});