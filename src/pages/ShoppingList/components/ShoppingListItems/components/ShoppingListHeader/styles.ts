import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  justify-content: flex-end;

  overflow: hidden;

  height: 140px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled(Animated.Text)`
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Description = styled(Animated.Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;
