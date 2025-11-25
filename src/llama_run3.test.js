import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLink_Active } from "./10_FilterLink_Active";

describe('FilterLink_Active', () => {
  const onFilterChange = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<FilterLink_Active onFilterChange={onFilterChange} />);
    expect(getByText('Active')).toBeInTheDocument();
    expect(getByTestId('filter-link-active')).toBeInTheDocument();
  });

  it('renders with selected class when isActive is true', () => {
    const { getByTestId } = render(<FilterLink_Active onFilterChange={onFilterChange} isActive />);
    expect(getByTestId('filter-link-active')).toHaveClass('selected');
  });

  it('does not render with selected class when isActive is false', () => {
    const { getByTestId } = render(<FilterLink_Active onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-active')).not.toHaveClass('selected');
  });

  it('calls onFilterChange when clicked', () => {
    const { getByTestId } = render(<FilterLink_Active onFilterChange={onFilterChange} />);
    const link = getByTestId('filter-link-active');
    fireEvent.click(link);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith('active');
  });
});