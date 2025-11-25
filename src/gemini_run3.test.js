import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_All } from "./09_FilterLink_All";

describe('FilterLink_All', () => {
  test('renders the link with the text "All"', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
    const linkElement = screen.getByTestId('filter-link-all');
    
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('All');
    expect(linkElement).toHaveAttribute('href', '#/');
  });

  test('does not have the "selected" class when isActive is false', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />);
    const linkElement = screen.getByTestId('filter-link-all');
    
    expect(linkElement).not.toHaveClass('selected');
  });

  test('does not have the "selected" class when isActive prop is not provided (defaults to false)', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
    const linkElement = screen.getByTestId('filter-link-all');
    
    expect(linkElement).not.toHaveClass('selected');
  });

  test('has the "selected" class when isActive is true', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />);
    const linkElement = screen.getByTestId('filter-link-all');
    
    expect(linkElement).toHaveClass('selected');
  });

  test('calls onFilterChange with "all" when the link is clicked', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
    const linkElement = screen.getByTestId('filter-link-all');
    
    fireEvent.click(linkElement);
    
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');
  });

  test('prevents the default link behavior on click', () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
    const linkElement = screen.getByTestId('filter-link-all');

    // Create a click event with a mocked preventDefault
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    jest.spyOn(clickEvent, 'preventDefault');

    fireEvent(linkElement, clickEvent);
    
    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
  });
});