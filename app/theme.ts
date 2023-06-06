import { PaletteMode } from '@mui/material';

/*
  Adding new colors: https://mui.com/material-ui/customization/palette/#adding-new-colors
*/

export const customThemePalette = {
  // mode: 'dark',
  // mode: 'light',
  primary: {
    main: '#4f46e5',
  },
  secondary: {
    main: '#f59e0b',
  },
};

const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        text: {
          primary: '#262626',
          secondary: '#525252',
        },
        background: {
          default: '#f5f5f4',
          paper: '#f5f5f4',
        },
        neutral: {
          main: '#e7e5e4',
          dark: '#262626',
          light: '#e7e5e4',
        },
        ...customThemePalette,
      }
      : {
        // palette values for dark mode
        text: {
          primary: '#e5e5e5',
          secondary: '#d4d4d4',
        },
        background: {
          default: '#171717',
          paper: '#171717',
        },
        neutral: {
          main: '#262626',
          dark: '#262626',
          light: '#f5f5f5',
        },
        ...customThemePalette,
      }),
  },
});

export default getDesignTokens;

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
/*
    Override the color props for the card
    https://mui.com/material-ui/customization/palette/#adding-new-colors
*/
declare module '@mui/material/Box' {
  interface CardPropsColorOverrides {
    neutral: true;
  }
}
