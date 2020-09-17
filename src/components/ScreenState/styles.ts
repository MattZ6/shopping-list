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
  background: ${({ theme }) => theme.backgrounds.listHeader};
`;

export const Icon = styled(VectorIcon).attrs(({ theme }) => ({
  size: 72,
  color: theme.texts.primaryLight,
}))``;

export const Title = styled.Text`
  text-align: center;
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.texts.primaryLight};
  margin-top: 8px;
`;

export const Description = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.texts.primaryLight};
  margin-top: 6px;
`;
