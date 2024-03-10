interface Asset {
  source: string;
}

interface ProductVariant {
  id: string;
  price: number;
  priceWithTax: number;
  currencyCode: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  featuredAsset: Asset;
  variants: ProductVariant[];
}

interface ProductListData {
  products: {
    items: Product[];
    totalItems: number;
  };
}
