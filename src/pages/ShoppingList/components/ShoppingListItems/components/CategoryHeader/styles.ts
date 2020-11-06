import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  height: 56px;
  padding: 0 16px;
  background: ${({ theme }) => theme.backgrounds.listHeader};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  line-height: 24px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  color: ${({ theme }) => theme.texts.primary};
`;

export const CountContainer = styled.View`
  flex-direction: row;
  margin-left: 8px;
`;

export const CheckIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'check',
  color: theme.colors.success,
  size: 16,
}))`
  margin-right: 4px;
`;

export const Label = styled.Text`
  font-size: 14px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.texts.primary};
  margin-left: 8px;
`;

export const LabelBold = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.texts.primary};
`;
