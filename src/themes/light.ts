import { DefaultTheme } from 'styled-components';

export default {
  backgrounds: {
    default: '#FFFFFF',
    whiteWithOpacity: 'rgba(255, 255, 255, 0.4)',
    listHeader: '#F9F9F9',
    divider: 'rgba(218,218,218,0.3)',
  },
  ripples: {
    primary: '#dbdfe4',
  },
  colors: {
    primary: '#529CED',
    success: '#2BD428',
  },
  texts: {
    primary: '#444444',
    primaryWithOpacity56: 'rgba(58, 58, 58, 0.56)',
    primaryWithOpacity32: 'rgba(58, 58, 58, 0.32)',
    primaryWithOpacity5: 'rgba(58, 58, 58, 0.05)',
    secondary: '#999999',
    tertiary: '#666666',
    tertiaryLight: '#DEDEDE',
    primaryLight: '#8793A8',
    // tertiary: '#BBC2CF',
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    regular: 'Nunito-Regular',
    semiBold: 'Nunito-SemiBold',
    bold: 'Nunito-Bold',
  },
} as DefaultTheme;
