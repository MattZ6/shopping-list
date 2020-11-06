import styled from 'styled-components/native';

export const Container = styled.View`
  padding-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;

  height: 52px;
  padding: 0 16px;
`;

export const ButtonTitle = styled.Text`
  flex: 1;

  margin-left: 16px;
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.texts.primary};
`;
