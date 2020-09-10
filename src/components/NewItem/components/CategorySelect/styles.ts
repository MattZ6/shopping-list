import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { ICategory } from './index';

export const Container = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  margin: 4px 16px;
`;

export const List = styled(FlatList as new () => FlatList<ICategory>).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})``;

export const Separator = styled.View`
  width: 8px;
`;
