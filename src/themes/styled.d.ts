import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgrounds: {
      default: string;
      listHeader: string;
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
      tertiary: string;
      white: string;
    };
    fonts: {
      regular: string;
      medium: string;
      bold: string;
    };
  }
}
