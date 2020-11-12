import { useDatabase } from '@nozbe/watermelondb/hooks';
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
  useRef,
} from 'react';
import { TextInput, Alert } from 'react-native';
import { useTheme } from 'styled-components';

import ShoppingList, {
  SHOPPING_LISTS_TABLE_NAME,
} from '../../../../models/ShoppingList';

import {
  Container,
  Title,
  Input,
  ButtonsContainer,
  CancelButton,
  SubmitButton,
} from './styles';

interface SaveListBottomSheetProps {
  shoppingList: ShoppingList | null;
  onClose: () => void;
}

const SaveListBottomSheet: React.FC<SaveListBottomSheetProps> = ({
  shoppingList: currentShoppingList,
  onClose,
}) => {
  const theme = useTheme();

  const database = useDatabase();

  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(currentShoppingList?.title ?? '');

  const title = useMemo(
    () => (currentShoppingList ? 'Editar lista' : 'Nova lista'),
    [currentShoppingList],
  );

  const isButtonDisabled = useMemo(() => value.trim().length === 0, [value]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(async () => {
    if (isButtonDisabled) {
      return;
    }

    try {
      await database.action(async () => {
        if (currentShoppingList) {
          await currentShoppingList.update(data => {
            Object.assign(data, {
              title: value.trim(),
            } as ShoppingList);
          });
        } else {
          const collection = database.collections.get<ShoppingList>(
            SHOPPING_LISTS_TABLE_NAME,
          );

          await collection.create(shoppingList => {
            Object.assign(shoppingList, {
              title: value.trim(),
            } as ShoppingList);
          });
        }
      });

      onClose();
    } catch (error) {
      Alert.alert('Ops, algo deu errado', 'Não foi possível salvar o item');
    }
  }, [database, currentShoppingList, isButtonDisabled, value, onClose]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Container>
      <Title>{title}</Title>

      <Input
        ref={inputRef}
        value={value}
        defaultValue={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
        placeholder="Qual o nome do item?"
        placeholderTextColor={theme.texts.secondary}
      />

      <ButtonsContainer>
        <CancelButton onPress={handleCancel}>Cancelar</CancelButton>

        <SubmitButton disabled={isButtonDisabled} onPress={handleSubmit}>
          Salvar
        </SubmitButton>
      </ButtonsContainer>
    </Container>
  );
};

export default memo(SaveListBottomSheet);
