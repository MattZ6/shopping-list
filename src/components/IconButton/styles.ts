import styled, { css } from 'styled-components/native';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled.View<ContainerProps>`
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 20px;

  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background: ${backgroundColor};
    `}
`;

export const Button = styled.TouchableNativeFeedback``;

export const ButtonContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(VectorIcon).attrs(({ theme }) => ({
  size: 24,
  color: theme.texts.white,
}))``;
