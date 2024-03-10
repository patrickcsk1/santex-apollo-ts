import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { Product } from './Product';
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';

const MAX_COUNT = 20;
const sortOptions = {
  name: 'ASC',
};

export const ProductList = () => {
  const [getProducts, { loading, data }] = useLazyQuery(GET_PRODUCTS);
  const [page, setPage] = useState<number>(1);
  const totalPage =
    Math.ceil((data?.products?.totalItems ?? 0) / MAX_COUNT) || 0;

  useEffect(() => {
    getProducts({
      variables: {
        options: {
          sort: sortOptions,
          take: MAX_COUNT,
          skip: (page - 1) * MAX_COUNT,
        },
      },
    });
  }, [getProducts, page]);

  const onChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box px={4} py={1} mt={2}>
      {loading ? (
        <Box
          width="100%"
          height="80vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">Loading...</Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container rowSpacing={3}>
          <Grid
            container
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Pagination count={totalPage} page={page} onChange={onChangePage} />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {data?.products.items.map((product: Product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Product key={product.id} product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
