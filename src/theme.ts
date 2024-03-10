import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '*': {
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
            'span, p, h1, h2, h3, h4, h5, h6': {
              margin: 0,
              padding: 0,
            },
          },
        },
      },
    },
  },
});
