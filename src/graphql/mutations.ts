import { gql } from '@apollo/client';
import { ORDER_DETAILS_FRAGMENT } from './fragments';

export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      __typename
      ... on Order {
        ...OrderDetails
      }
    }
  }
  ${ORDER_DETAILS_FRAGMENT}
`;

export const REMOVE_ALL_ORDERS = gql`
  mutation RemoveAllOrders {
    removeAllOrderLines {
      __typename
      ... on Order {
        ...OrderDetails
      }
    }
  }
  ${ORDER_DETAILS_FRAGMENT}
`;
