import styled, { css } from 'styled-components/native';

interface ContainerProps {
  size: 'small' | 'default';
  backgroundColor?: string;
}

export const Container = styled.View<ContainerProps>`
  overflow: hidden;

  ${({ size }) =>
    size === 'small' &&
    css`
      width: 40px;
      height: 40px;
      border-radius: 20px;
    `}

  ${({ size }) =>
    size === 'default' &&
    css`
      width: 56px;
      height: 56px;
      border-radius: 28px;
    `}

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
