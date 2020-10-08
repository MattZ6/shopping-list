import styled from 'styled-components/native';

import Button, { ButtonProps } from '../../../../components/Button';
import ButtonOutline, {
  ButtonOutlineProps,
} from '../../../../components/ButtonOutline';

export const Container = styled.View``;

export const Title = styled.Text`
  font-size: 28px;
  line-height: 32px;
  margin: 8px 16px 0;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.texts.primary};
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
  padding: 20px 16px 16px;
`;

export const CancelButton = styled(ButtonOutline).attrs({
  containerStyle: {
    flex: 1,
  },
} as ButtonOutlineProps)``;

export const SubmitButton = styled(Button).attrs({
  containerStyle: {
    flex: 2,
    marginLeft: 12,
  },
} as ButtonProps)``;
