import { palette } from '../styledTheme';
import { Box, Button, Typography, styled } from '@mui/material';
import { formatPrice } from '../utils';
import { useAppContext } from '../customContext';

const StyledWrapper = styled(Box)`
  box-shadow: 0 0 10px -2px ${palette.yinmnBlue};
  border-radius: 1.5rem;
  padding: 1rem;
  height: 100%;
  img {
    width: 100%;
    height: 250px;
    border-radius: 1rem 1rem 0 0;
    object-fit: cover;
  }
`;

const StyledBuyButton = styled(Button)`
  border: 1px solid ${palette.yinmnBlue};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: ${palette.yinmnBlue};
  :hover {
    background: ${palette.yinmnBlue};
    color: white;
  }
`;

const StyledDescription = styled(Box)`
  border-top: 1px solid ${palette.oxfordBlue};
  border-bottom: 1px solid ${palette.oxfordBlue};
`;

export const Product = ({ product }: { product: Product }) => {
  const { state: contextState, addItemToOrder } = useAppContext();

  const onAdd = () => {
    addItemToOrder(product, 1);
  };

  return (
    <StyledWrapper display="flex" flexDirection="column">
      <img src={product.featuredAsset.source} alt={product.name} />
      <Typography variant="h6" fontWeight="bold" my={2}>
        {product.name}
      </Typography>
      <StyledDescription flex={1} py={1} mb={1}>
        <p>{product.description}</p>
      </StyledDescription>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <p>{formatPrice(product.variants[0].priceWithTax)}</p>
        <StyledBuyButton disabled={contextState.loading} onClick={onAdd}>
          Buy
        </StyledBuyButton>
      </Box>
    </StyledWrapper>
  );
};
