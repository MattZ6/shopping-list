import styled from 'styled-components/native';

import ButtonOutline, { ButtonOutlineProps } from '../ButtonOutline';
import Button, { ButtonProps } from '../Button';

export const Container = styled.View`
  padding-top: 8px;
`;

export const Title = styled.Text`
  padding: 0 16px;
  font-size: 24px;
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Input = styled.TextInput`
  margin-top: 8px;
  padding: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  padding: 16px;
`;

export const CancelButton = styled(ButtonOutline).attrs({
  containerStyle: {
    flex: 1,
  },
} as ButtonOutlineProps)``;

export const SubmitButton = styled(Button).attrs({
  containerStyle: {
    flex: 2,
    marginLeft: 8,
  },
} as ButtonProps)``;
