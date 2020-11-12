import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
  border-radius: 28px;

  overflow: hidden;
`;

export const Button = styled.TouchableNativeFeedback``;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.primary};
  height: 52px;
  padding: 0 16px;
  border-radius: 28px;
`;

export const Title = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.texts.white};
`;
