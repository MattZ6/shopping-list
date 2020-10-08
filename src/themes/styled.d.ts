import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgrounds: {
      default: string;
      whiteWithOpacity: string;
      listHeader: string;
      divider: string;
    };
    ripples: {
      primary: string;
    };
    colors: {
      primary: string;
      success: string;
    };
    texts: {
      primary: string;
      secondary: string;
      primaryLight: string;
      tertiary: string;
      white: string;
      black: string;
    };
    fonts: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
  }
}
