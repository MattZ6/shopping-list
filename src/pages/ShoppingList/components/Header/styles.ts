import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 5;
`;

export const StatusBarSpace = styled.View`
  height: 24px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 56px;
  padding: 0 8px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
`;

export const Title = styled(Animated.Text)`
  flex: 1;
  margin: 0 8px;
  font-size: 16px;
  line-height: 32px;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
