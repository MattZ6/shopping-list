import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableNativeFeedback``;

export const Wrapper = styled.View`
  height: 56px;
  padding: 0 16px;
`;

interface ContentProps {
  showBorder: boolean;
}

export const Content = styled.View<ContentProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;

  ${({ showBorder }) =>
    showBorder &&
    css`
      border-bottom-width: 1px;
      border-style: solid;
      border-color: ${({ theme }) => theme.backgrounds.divider};
    `}
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;

  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.texts.primary};
`;

export const CheckBoxContainer = styled.View`
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;
