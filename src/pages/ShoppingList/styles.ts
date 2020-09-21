import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  position: relative;
  background: ${({ theme }) => theme.backgrounds.default};
`;

export const FabContainer = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
