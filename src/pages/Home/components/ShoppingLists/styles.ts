import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import ShoppingList from '../../../../models/ShoppingList';

export const Container = styled.View`
  flex: 1;

  overflow: hidden;
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: ${({ theme }) => theme.backgrounds.default};
`;

export const Header = styled.View`
  padding: 24px 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.texts.primary};
  line-height: 32px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export const Description = styled.Text`
  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.texts.secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const List = styled(FlatList as new () => FlatList<ShoppingList>).attrs({
  contentContainerStyle: {
    paddingBottom: 72,
  },
})`
  flex: 1;
`;

export const Fab = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
  border-radius: 28px;

  overflow: hidden;
`;

export const FabButton = styled.TouchableNativeFeedback``;

export const FabButtonContent = styled.View`
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.primary};
  height: 52px;
  padding: 0 16px;
  border-radius: 28px;
`;

export const FabTitle = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.texts.white};
`;
