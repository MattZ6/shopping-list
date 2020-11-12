import styled from 'styled-components/native';

export const ITEMS_LIST_STICKY_HEADER_HEIGHT = 96;

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  height: ${ITEMS_LIST_STICKY_HEADER_HEIGHT}px;
`;

export const Content = styled.View`
  padding: 24px 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: ${({ theme }) => theme.backgrounds.default};
`;

export const Title = styled.Text`
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export const Description = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.texts.secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
