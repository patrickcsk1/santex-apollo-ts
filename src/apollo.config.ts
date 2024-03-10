import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

const commerceLink = createHttpLink({
  uri: 'https://demo.vendure.io/shop-api/shop-api',
  headers: {
    authorization: localStorage.getItem('Auth-Token')
      ? `Bearer ${localStorage.getItem('Auth-Token')}`
      : '',
  },
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get('Vendure-Auth-Token');

    if (authHeader) {
      localStorage.setItem('Auth-Token', authHeader);
    }
    return response;
  });
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([afterwareLink, commerceLink]),
});
