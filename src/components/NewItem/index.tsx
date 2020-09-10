import React, { memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';

import OutlineButton from '../ButtonOutline';

import CategorySelect from './components/CategorySelect';

import {
  Container,
  Title,
  Input,
  ButtonsContainer,
  CancelButton,
  SubmitButton,
} from './styles';

const NewItem: React.FC = () => {
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const contentHeight = useMemo(() => height / 1.3, [height]);

  return (
    <Container style={{ height: contentHeight }}>
      <Title>Novo item</Title>

      <Input
        placeholder="Qual o nome do item?"
        placeholderTextColor={theme.texts.primaryLight}
      />

      <CategorySelect />

      <ButtonsContainer>
        <CancelButton disabled>Cancelar</CancelButton>
        <SubmitButton>Salvar</SubmitButton>
      </ButtonsContainer>
    </Container>
  );
};

export default memo(NewItem);
