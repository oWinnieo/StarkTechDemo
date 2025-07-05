'use client';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { useStore } from '@store/useStore';
import type { SearchState } from '@store/useStore';

const theme1 = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
});
// const theme2 = createTheme(); // 預設主題
// const theme = createTheme({
//     palette: {
//         mode: currentMode
//     }
// }); // 預設主題


export const MuiThemeProvider = ({ children }: { children: ReactNode }) => {
    const mode = useStore((state: SearchState) => state.mode); // 來自 zustand
    const theme = useMemo(() => createTheme({
        palette: {
        mode,
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        },
    }), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};