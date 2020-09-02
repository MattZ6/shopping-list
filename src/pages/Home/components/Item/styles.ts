import styled from 'styled-components/native';

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

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.texts.primary};
`;

export const CheckboxContent = styled.View`
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;
