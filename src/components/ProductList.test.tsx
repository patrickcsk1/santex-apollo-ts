import { render, screen, waitFor } from '@testing-library/react';
import { ProductList } from './ProductList';
import { useLazyQuery } from '@apollo/client';
import { mockProducts } from '../mockTest';
import { TestWrapper } from '../test.utils';
import { useAppContext } from '../customContext';

jest.mock('../customContext', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
}));

const mockData = {
  products: {
    items: mockProducts,
    totalItems: mockProducts.length,
  },
};

const mockContextState = {
  loading: false,
};

const ProductListMock = () => {
  return (
    <TestWrapper>
      <ProductList />
    </TestWrapper>
  );
};

describe('ProductList component', () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: mockContextState,
    });
  });

  it('renders loading state when loading', async () => {
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: true, data: undefined },
    ]);

    render(<ProductListMock />);

    // Check if loading state is rendered
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    // Check if loading spinner is rendered
    const loadingSpinner = screen.getByRole('progressbar');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('renders products when not loading', async () => {
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, data: mockData },
    ]);

    render(<ProductListMock />);

    await waitFor(() => {
      const product1 = screen.getByText(mockProducts[0].name);
      const product2 = screen.getByText(mockProducts[1].name);
      expect(product1).toBeInTheDocument();
      expect(product2).toBeInTheDocument();
    });
  });
});
