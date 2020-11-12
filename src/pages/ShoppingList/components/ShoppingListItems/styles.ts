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
