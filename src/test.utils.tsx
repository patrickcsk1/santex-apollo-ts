import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ReactChild } from 'react';
import { MockedProvider } from '@apollo/client/testing';

export const TestWrapper = ({ children }: { children: ReactChild }) => {
  return (
    <ThemeProvider theme={theme}>
      <MockedProvider>{children}</MockedProvider>
    </ThemeProvider>
  );
};
