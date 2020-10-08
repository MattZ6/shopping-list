import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 6px;
  height: 44px;

  overflow: hidden;

  border-style: solid;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.backgrounds.listHeader};
`;

export const Touchable = styled.TouchableNativeFeedback``;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 16px;
`;

export interface TitleProps {
  disabled: boolean;
}

export const Title = styled.Text<TitleProps>`
  letter-spacing: 1px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.texts.tertiary : theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: 16px;
`;
