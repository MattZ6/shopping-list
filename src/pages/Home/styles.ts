import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const TOOLBAR_HEIGHT = 80;

export const Container = styled.View`
  flex: 1;

  position: relative;
  background: ${({ theme }) => theme.colors.primary};
`;

export const Toolbar = styled.View`
  height: ${TOOLBAR_HEIGHT}px;
`;

export const ToolbarContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding: 28px 8px 0;
`;

export interface ScrollItem {
  isSticky?: boolean;
  key: string;
  render: () => JSX.Element;
}

export const Scroll = styled(FlatList as new () => FlatList<ScrollItem>)`
  flex: 1;
`;

interface SpacerProps {
  height: number;
}

export const Spacer = styled.View<SpacerProps>`
  height: ${props => props.height}px;
  background: ${({ theme }) => theme.backgrounds.default};
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 16px;
`;

export const EmptyListTitle = styled.Text`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.texts.white};
`;

export const EmptyListDescription = styled.Text`
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.texts.white};
`;

export const EmptyListButtonWrapper = styled.View`
  align-self: stretch;

  overflow: hidden;
  border-radius: 6px;
  height: 44px;

  margin-top: 32px;

  border-width: 0.5px;
  border-color: ${({ theme }) => theme.backgrounds.whiteWithOpacity};
`;

export const EmptyListTouchable = styled.TouchableNativeFeedback`
  flex: 1;
`;

export const EmptyListTouchableContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 16px;
`;

export const EmptyListTouchableContentTitle = styled.Text`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  line-height: 24px;
`;
