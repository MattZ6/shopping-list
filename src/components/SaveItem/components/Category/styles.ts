import styled from 'styled-components/native';

interface ContainerProps {
  selected: boolean;
}

export const Container = styled.View<ContainerProps>`
  overflow: hidden;
  height: 30px;
  border-radius: 15px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.backgrounds.listHeader};
`;

export const Button = styled.TouchableNativeFeedback`
  flex: 1;
`;

export const ButtonContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 18px;
`;

interface TitleProps {
  selected: boolean;
}

export const Title = styled.Text<TitleProps>`
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme, selected }) =>
    selected ? theme.texts.white : theme.texts.primary};
`;
