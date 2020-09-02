import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  height: 72px;
  padding: 0 16px;
  background: ${({ theme }) => theme.backgrounds.listHeader};
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.texts.primary};
`;

export const Label = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.texts.primary};
`;

export const LabelBold = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.texts.primary};
`;
