import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe('FilterLink_Completed', () => {
  const onFilterChange = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} />);
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByTestId('filter-link-completed')).toBeInTheDocument();
  });

  it('renders with selected class when isActive is true', () => {
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} isActive />);
    expect(getByTestId('filter-link-completed')).toHaveClass('selected');
  });

  it('does not render with selected class when isActive is false', () => {
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-completed')).not.toHaveClass('selected');
  });

  it('calls onFilterChange when clicked', () => {
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} />);
    const link = getByTestId('filter-link-completed');
    fireEvent.click(link);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });
});