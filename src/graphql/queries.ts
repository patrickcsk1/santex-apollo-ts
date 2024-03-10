import { gql } from '@apollo/client';
import { PRODUCT_DETAILS_FRAGMENT } from './fragments';

export const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
        ...ProductDetails
      }
      totalItems
    }
  }
  ${PRODUCT_DETAILS_FRAGMENT}
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID) {
    product(id: $id) {
      ...ProductDetails
    }
  }
  ${PRODUCT_DETAILS_FRAGMENT}
`;
