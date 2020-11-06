import styled from 'styled-components/native';

export const Container = styled.View`
  overflow: hidden;
  border-radius: 6px;
  height: 44px;
`;

export const Touchable = styled.TouchableNativeFeedback`
  flex: 1;
`;

export interface ContentProps {
  disabled: boolean;
}

export const Content = styled.View<ContentProps>`
  flex: 1;
  align-items: center;
  justify-content: center;

  background: ${({ theme, disabled }) =>
    disabled ? theme.backgrounds.listHeader : theme.colors.primary};
  padding: 0 16px;
`;

export interface TitleProps {
  disabled: boolean;
}

export const Title = styled.Text<TitleProps>`
  letter-spacing: 1px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.texts.primaryLight : theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  line-height: 24px;
`;
