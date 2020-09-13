import React, { memo, useMemo, useRef, useCallback } from 'react';
import { useWindowDimensions, TextInput } from 'react-native';
import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';

import { addItem } from '../../store/modules/items/actions';

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

  const dispatch = useDispatch();

  const inputRef = useRef<TextInput>(null);

  const contentHeight = useMemo(() => height / 1.3, [height]);

  const handleSubmit = useCallback(() => {
    dispatch(addItem({ title: 'Papel higiênico', category: 'Banheiro' }));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    // TODO: Esconder a Bottom Sheet
  }, []);

  return (
    <Container style={{ height: contentHeight }}>
      <Title>Novo item</Title>

      <Input
        ref={inputRef}
        placeholder="Qual o nome do item?"
        placeholderTextColor={theme.texts.primaryLight}
      />

      <CategorySelect />

      <ButtonsContainer>
        <CancelButton
          onPress={handleCancel}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 0 }}
        >
          Cancelar
        </CancelButton>

        <SubmitButton
          onPress={handleSubmit}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 0 }}
        >
          Salvar
        </SubmitButton>
      </ButtonsContainer>
    </Container>
  );
};

export default memo(NewItem);
