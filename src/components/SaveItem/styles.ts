import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { ICategory } from './index';

import ButtonOutline, { ButtonOutlineProps } from '../ButtonOutline';
import Button, { ButtonProps } from '../Button';

export const Container = styled.View`
  margin-top: 32px;
`;

export const Title = styled.Text`
  font-size: 28px;
  line-height: 32px;
  margin: 8px 16px 0;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.texts.primary};
`;

export const Input = styled.TextInput`
  margin-top: 8px;
  padding: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const SelectContainer = styled.View``;

export const SelectLabel = styled.Text`
  color: ${({ theme }) => theme.texts.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  margin: 4px 16px;
`;

export const SelectList = styled(
  FlatList as new () => FlatList<ICategory>,
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})``;

export const SelectListSeparator = styled.View`
  width: 8px;
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
