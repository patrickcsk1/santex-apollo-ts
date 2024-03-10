import { render, screen, fireEvent } from '@testing-library/react';
import { Product } from './Product';
import { useAppContext } from '../customContext';
import { TestWrapper } from '../test.utils';
import { mockProducts } from '../mockTest';
import { formatPrice } from '../utils';

jest.mock('../customContext', () => ({
  useAppContext: jest.fn(),
}));

const mockProduct = mockProducts[0];

const ProductMock = () => {
  return (
    <TestWrapper>
      <Product product={mockProduct} />
    </TestWrapper>
  );
};

describe('Product component', () => {
  it('renders the product correctly', () => {
    const mockContextState = {
      loading: false,
    };
    const mockAddItemToOrder = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      state: mockContextState,
      addItemToOrder: mockAddItemToOrder,
    });

    render(<ProductMock />);

    const productTitle = screen.getByText(mockProduct.name);
    expect(productTitle).toBeInTheDocument();

    const productDescription = screen.getByText(mockProduct.description);
    expect(productDescription).toBeInTheDocument();

    const priceMock = formatPrice(mockProduct.variants[0].priceWithTax);
    const productPrice = screen.getByText(priceMock);
    expect(productPrice).toBeInTheDocument();

    const buyButton = screen.getByText('Buy');
    fireEvent.click(buyButton);

    expect(mockAddItemToOrder).toHaveBeenCalledWith(mockProduct, 1);
  });
});
