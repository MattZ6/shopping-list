import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgrounds: {
      default: string;
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
      primaryLight: string;
      tertiary: string;
      white: string;
    };
    fonts: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
  }
}
