import styled from 'styled-components/native';

export const Container = styled.TouchableNativeFeedback``;

export const ContenContent = styled.View`
  flex-direction: row;
  align-items: center;

  height: 56px;
  padding: 0 16px;
  /* 
  border-bottom-width: 1px;
  border-color: #f9f9f9;
  border-style: solid; */
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.texts.primary};
`;

export const CheckBoxContainer = styled.View`
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;
