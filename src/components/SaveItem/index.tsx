import React, { memo, useMemo, useRef, useCallback, useEffect } from 'react';
import { useWindowDimensions, Alert, Insets, TextInput } from 'react-native';
import { useTheme } from 'styled-components';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import Item, { ITEMS_TABLE_NAME } from '../../models/Item';

import BottomSheet, { BottomSheetHandles } from '../BottomSheet';

import CategorySelect, {
  CategorySelectHandles,
} from './components/CategorySelect';

import {
  Container,
  Title,
  Input,
  ButtonsContainer,
  CancelButton,
  SubmitButton,
} from './styles';

const hitSlop: Insets = { top: 10, right: 10, bottom: 10, left: 10 };

interface SaveItemProps {
  shoppingListId: string;
  editItem?: Item;
  visible?: boolean;
  onClose?: () => void;
}

const SaveItem: React.FC<SaveItemProps> = ({
  onClose,
  visible,
  shoppingListId,
  editItem,
}) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const database = useDatabase();

  const bottomSheetRef = useRef<BottomSheetHandles>(null);
  const categorySelectRef = useRef<CategorySelectHandles>(null);

  const inputValue = useRef(editItem?.title ?? '');
  const inputRef = useRef<TextInput>(null);

  const contentHeight = useMemo(() => height / 1.3, [height]);

  const handleChangeInputValue = useCallback(text => {
    inputValue.current = text;
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log(inputValue.current.trim());
    console.log(categorySelectRef.current?.selected);

    if (
      !inputValue.current.trim().length ||
      !categorySelectRef.current?.selected
    ) {
      return;
    }

    try {
      await database.action(async () => {
        if (editItem) {
          await editItem.update(data => {
            Object.assign(data, {
              title: inputValue.current.trim(),
              category: categorySelectRef.current?.selected?.title,
            } as Item);
          });
        } else {
          const collection = database.collections.get<Item>(ITEMS_TABLE_NAME);

          await collection.create(item => {
            Object.assign(item, {
              title: inputValue.current.trim(),
              category: categorySelectRef.current?.selected?.title,
              shopping_list_id: shoppingListId,
            } as Item);
          });
        }
      });

      inputValue.current = '';

      bottomSheetRef.current?.close();
    } catch (error) {
      Alert.alert('Ops, algo deu errado', 'Não foi possível salvar o item');
    }
  }, [database, editItem, shoppingListId]);

  const handleCancel = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const afterClosed = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    setTimeout(() => {
      if (editItem) {
        handleChangeInputValue(editItem?.title);
      }
    }, 0);
  }, [editItem, handleChangeInputValue]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [visible]);

  return (
    <BottomSheet ref={bottomSheetRef} isVisible={visible} onClose={afterClosed}>
      <Container style={{ height: contentHeight }}>
        <Title>{editItem ? 'Editar item' : 'Novo item'}</Title>

        <Input
          ref={inputRef}
          defaultValue={editItem?.title}
          onChangeText={handleChangeInputValue}
          placeholder="Qual o nome do item?"
          placeholderTextColor={theme.texts.primaryLight}
        />

        <CategorySelect
          ref={categorySelectRef}
          selectedCategory={editItem?.category}
        />

        <ButtonsContainer>
          <CancelButton hitSlop={hitSlop} onPress={handleCancel}>
            Cancelar
          </CancelButton>

          <SubmitButton hitSlop={hitSlop} onPress={handleSubmit}>
            Salvar
          </SubmitButton>
        </ButtonsContainer>
      </Container>
    </BottomSheet>
  );
};

export default memo(SaveItem);
