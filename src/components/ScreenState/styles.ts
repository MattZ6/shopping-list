import styled from 'styled-components/native';
import { Animated } from 'react-native';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled(Animated.View)`
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;

  width: 128px;
  height: 128px;
  border-radius: 128px;
  background: ${({ theme }) => theme.texts.primaryWithOpacity5};
`;

export const Icon = styled(VectorIcon).attrs(({ theme }) => ({
  size: 72,
  color: theme.texts.primaryWithOpacity32,
}))``;

export const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.texts.primaryWithOpacity56};
  margin-top: 8px;
`;

export const Description = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.texts.primaryWithOpacity56};
  margin-top: 6px;
`;
