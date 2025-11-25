import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLink_All } from "./09_FilterLink_All";

describe('FilterLink_All', () => {
  const onFilterChange = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<FilterLink_All onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-all')).toBeInTheDocument();
    expect(getByTestId('filter-link-all')).toHaveTextContent('All');
    expect(getByTestId('filter-link-all')).toHaveAttribute('href', '#/');
  });

  it('renders with selected class when isActive is true', () => {
    const { getByTestId } = render(<FilterLink_All isActive={true} onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-all')).toHaveClass('selected');
  });

  it('does not render with selected class when isActive is false', () => {
    const { getByTestId } = render(<FilterLink_All isActive={false} onFilterChange={onFilterChange} />);
    expect(getByTestId('filter-link-all')).not.toHaveClass('selected');
  });

  it('calls onFilterChange when clicked', () => {
    const { getByTestId } = render(<FilterLink_All onFilterChange={onFilterChange} />);
    const link = getByTestId('filter-link-all');
    fireEvent.click(link);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith('all');
  });

  it('prevents default link behavior on click', () => {
    const { getByTestId } = render(<FilterLink_All onFilterChange={onFilterChange} />);
    const link = getByTestId('filter-link-all');
    const preventDefault = jest.fn();
    const e = { preventDefault };
    fireEvent.click(link, e);
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});