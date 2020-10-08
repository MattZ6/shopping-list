import { DefaultTheme } from 'styled-components';

export default {
  backgrounds: {
    default: '#FFFFFF',
    whiteWithOpacity: 'rgba(255, 255, 255, 0.4)',
    listHeader: '#F0F2F4',
    divider: 'rgba(218,218,218,0.3)',
  },
  ripples: {
    primary: '#dbdfe4',
  },
  colors: {
    primary: '#529CED',
    success: '#55D061',
  },
  texts: {
    primary: '#444444',
    secondary: '#999999',
    primaryLight: '#8793A8',
    tertiary: '#BBC2CF',
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semiBold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
  },
} as DefaultTheme;
