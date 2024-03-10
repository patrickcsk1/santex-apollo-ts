import { gql } from '@apollo/client';

export const PRODUCT_DETAILS_FRAGMENT = gql`
  fragment ProductDetails on Product {
    id
    name
    description
    featuredAsset {
      source
    }
    variants {
      id
      price
      priceWithTax
      currencyCode
    }
  }
`;

export const ORDER_DETAILS_FRAGMENT = gql`
  fragment OrderDetails on Order {
    id
    shippingWithTax
    subTotalWithTax
    totalWithTax
    lines {
      productVariant {
        id
        productId
        name
      }
      unitPrice
      unitPriceWithTax
      quantity
      lineTax
    }
    surcharges {
      priceWithTax
      description
    }
    taxSummary {
      taxTotal
    }
  }
`;
