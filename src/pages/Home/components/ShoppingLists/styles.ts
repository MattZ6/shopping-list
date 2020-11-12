import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.backgrounds.default};
`;

export const FabContainer = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
