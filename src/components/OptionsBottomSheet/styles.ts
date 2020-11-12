import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 32px;
  padding-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;

  height: 56px;
  padding: 0 16px;
`;

export const ButtonTitle = styled.Text`
  flex: 1;

  font-size: 16px;
  line-height: 24px;
  margin-left: 16px;
  letter-spacing: 0.25px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.texts.tertiary};
`;
