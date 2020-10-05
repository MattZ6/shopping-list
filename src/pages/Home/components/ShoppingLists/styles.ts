import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { IShoppingList } from '.';

export const Container = styled.View`
  flex: 1;

  overflow: hidden;
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: #fff;
`;

export const Header = styled.View`
  padding: 24px 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #444;
  line-height: 32px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export const Description = styled.Text`
  font-size: 15px;
  color: #999;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const List = styled(FlatList as new () => FlatList<IShoppingList>).attrs(
  {
    contentContainerStyle: {
      paddingBottom: 72,
    },
  },
)`
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

  background: #529ced;
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
