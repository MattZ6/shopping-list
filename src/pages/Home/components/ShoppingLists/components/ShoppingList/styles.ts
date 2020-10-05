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
  font-size: 17px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: #444444;
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-top: 2px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #999999;
`;
