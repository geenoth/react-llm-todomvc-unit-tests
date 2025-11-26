import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe('FilterLink_Completed', () => {
  const onFilterChange = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-completed')).toBeInTheDocument();
    expect(getByTestId('filter-link-completed')).toHaveTextContent('Completed');
    expect(getByTestId('filter-link-completed')).toHaveAttribute('href', '#/completed');
  });

  it('renders with selected class when isActive is true', () => {
    const { getByTestId } = render(<FilterLink_Completed isActive={true} onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-completed')).toHaveClass('selected');
  });

  it('does not render with selected class when isActive is false', () => {
    const { getByTestId } = render(<FilterLink_Completed isActive={false} onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-completed')).not.toHaveClass('selected');
  });

  it('calls onFilterChange when clicked', () => {
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} />);
    const link = getByTestId('filter-link-completed');
    fireEvent.click(link);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('prevents default link behavior on click', () => {
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={onFilterChange} />);
    const link = getByTestId('filter-link-completed');
    const preventDefault = jest.fn();
    const e = { preventDefault };
    fireEvent.click(link, e);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});