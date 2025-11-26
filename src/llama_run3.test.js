import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe('FilterLink_Completed component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<FilterLink_Completed />);
    expect(getByTestId('filter-link-completed')).toBeInTheDocument();
    expect(getByTestId('filter-link-completed')).toHaveTextContent('Completed');
  });

  it('renders as selected when isActive prop is true', () => {
    const { getByTestId } = render(<FilterLink_Completed isActive={true} />);
    expect(getByTestId('filter-link-completed')).toHaveClass('selected');
  });

  it('calls onFilterChange callback on click', () => {
    const onFilterChangeMock = jest.fn();
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChangeMock} />);
    const link = getByTestId('filter-link-completed');
    fireEvent.click(link);
    expect(onFilterChangeMock).toHaveBeenCalledTimes(1);
    expect(onFilterChangeMock).toHaveBeenCalledWith('completed');
  });

  it('prevents default link behavior on click', () => {
    const preventDefaultMock = jest.fn();
    const { getByTestId } = render(<FilterLink_Completed />);
    const link = getByTestId('filter-link-completed');
    const event = { preventDefault: preventDefaultMock };
    fireEvent.click(link, event);
    expect(preventDefaultMock).toHaveBeenCalledTimes(1);
  });
});