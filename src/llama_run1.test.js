import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLink_Active } from "./10_FilterLink_Active";

describe('FilterLink_Active component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<FilterLink_Active />);
    expect(getByTestId('filter-link-active')).toBeInTheDocument();
    expect(getByTestId('filter-link-active')).toHaveTextContent('Active');
  });

  it('renders as selected when isActive prop is true', () => {
    const { getByTestId } = render(<FilterLink_Active isActive={true} />);
    expect(getByTestId('filter-link-active')).toHaveClass('selected');
  });

  it('calls onFilterChange callback on click', () => {
    const onFilterChangeMock = jest.fn();
    const { getByTestId } = render(<FilterLink_Active onFilterChange={onFilterChangeMock} />);
    const link = getByTestId('filter-link-active');
    fireEvent.click(link);
    expect(onFilterChangeMock).toHaveBeenCalledTimes(1);
    expect(onFilterChangeMock).toHaveBeenCalledWith('active');
  });

  it('prevents default link behavior on click', () => {
    const preventDefaultMock = jest.fn();
    const { getByTestId } = render(<FilterLink_Active />);
    const link = getByTestId('filter-link-active');
    const event = { preventDefault: preventDefaultMock };
    fireEvent.click(link, event);
    expect(preventDefaultMock).toHaveBeenCalledTimes(1);
  });
});