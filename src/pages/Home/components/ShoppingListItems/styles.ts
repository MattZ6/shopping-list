import styled from 'styled-components/native';
import { FlatList, ActivityIndicatorProps } from 'react-native';

import { Section } from '.';

export const List = styled(FlatList as new () => FlatList<Section>).attrs({
  contentContainerStyle: {
    paddingBottom: 64,
  },
})`
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
