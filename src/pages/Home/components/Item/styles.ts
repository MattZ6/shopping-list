import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableNativeFeedback``;

export const ContenContent = styled.View`
  flex-direction: row;
  align-items: center;

  height: 56px;
  padding: 0 16px;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 700;

  color: ${({ theme }) => theme.texts.primary};
`;

export const CheckboxContent = styled.View`
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;

interface CheckProps {
  isChecked?: boolean;
}

export const Check = styled.View<CheckProps>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.texts.tertiary};
  /* border: 2px solid ${props => (props.isChecked ? '#6094f4' : '#bbc2cf')}; */

  ${props =>
    props.isChecked &&
    css`
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.primary};
    `}
`;
