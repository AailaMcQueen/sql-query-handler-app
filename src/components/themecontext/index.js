import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
});

export const ThemeWrapper = (props) => {
  const [mode, setMode] = React.useState(
    localStorage.getItem('theme') || 'dark'
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          let newTheme = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return newTheme;
        });
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
