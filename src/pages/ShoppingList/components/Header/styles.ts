import styled from 'styled-components/native';

export const Container = styled.View`
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
`;

export const StatusBarSpace = styled.View`
  height: 24px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 56px;
  padding: 0 8px;
`;

export const LeftButtons = styled.View`
  flex-direction: row;
`;

export const RightButtons = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.texts.white};
`;
