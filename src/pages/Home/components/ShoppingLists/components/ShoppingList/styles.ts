import styled, { css } from 'styled-components/native';

export const Button = styled.TouchableNativeFeedback``;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 0 8px 0 16px;
`;

interface ButtonContentProps {
  showBorder: boolean;
}

export const ButtonContent = styled.View<ButtonContentProps>`
  flex: 1;

  margin-right: 8px;
  padding: 16px 0;

  ${({ showBorder }) =>
    showBorder &&
    css`
      border-bottom-width: 1px;
      border-style: solid;
      border-color: ${({ theme }) => theme.backgrounds.divider};
    `}
`;

export const Title = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export const Label = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.texts.secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
