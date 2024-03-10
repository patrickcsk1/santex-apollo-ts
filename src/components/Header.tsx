import { Box, Button, Typography, styled } from '@mui/material';
import { palette } from '../styledTheme';
import { useAppContext } from '../customContext';
import { formatPrice } from '../utils';

const StyledHeader = styled(Box)`
  background: ${palette.richBlack};
  color: ${palette.platinium};
  img {
    width: 200px;
    height: auto;
    object-fit: contain;
  }
`;

const StyledClearButton = styled(Button)`
  background: ${palette.platinium};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: ${palette.yinmnBlue};
  :hover {
    background: ${palette.platinium};
    color: ${palette.yinmnBlue};
  }
`;

export function Header() {
  const { state: contextState, clearBasket } = useAppContext();
  return (
    <StyledHeader
      px={4}
      py={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
        data-testid="logo"
      />
      <Box display="flex" alignItems="center" gap={3}>
        <Typography variant="h5">{formatPrice(contextState.total)}</Typography>
        <StyledClearButton onClick={clearBasket}>Clear</StyledClearButton>
      </Box>
    </StyledHeader>
  );
}
