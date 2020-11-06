import styled from 'styled-components/native';
import { FlatList, ActivityIndicatorProps, Animated } from 'react-native';

import { Section } from '.';

export const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.primary};
`;

export const List = styled(FlatList as new () => FlatList<Section>)`
  flex: 1;
`;

export const Header = styled(Animated.View)`
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

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator.attrs(
  ({ theme }) =>
    ({
      color: theme.colors.primary,
    } as ActivityIndicatorProps),
)``;

interface SpacerProps {
  height: number;
}

export const Spacer = styled.View<SpacerProps>`
  height: ${props => props.height}px;
  background: ${({ theme }) => theme.backgrounds.default};
`;
