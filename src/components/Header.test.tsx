import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { useAppContext } from '../customContext';
import { formatPrice } from '../utils';
import { TestWrapper } from '../test.utils';

jest.mock('../customContext', () => ({
  useAppContext: jest.fn(),
}));

const HeaderMock = () => {
  return (
    <TestWrapper>
      <Header />
    </TestWrapper>
  );
};

describe('Header component', () => {
  it('renders the logo and total price correctly', () => {
    const mockContextState = {
      total: 100,
    };
    const mockClearBasket = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      state: mockContextState,
      clearBasket: mockClearBasket,
    });

    render(<HeaderMock />);

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();

    const totalPrice = screen.getByText(formatPrice(mockContextState.total));
    expect(totalPrice).toBeInTheDocument();
  });

  it('calls clearBasket function when clear button is clicked', () => {
    const mockContextState = {
      total: 100,
    };
    const mockClearBasket = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      state: mockContextState,
      clearBasket: mockClearBasket,
    });

    render(<HeaderMock />);

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(mockClearBasket).toHaveBeenCalled();
  });
});
