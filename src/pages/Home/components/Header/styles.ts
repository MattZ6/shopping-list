import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;

  height: 186px;
  /* height: 80px; */
  padding: 24px 16px 0;
  background: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.texts.white};
`;
