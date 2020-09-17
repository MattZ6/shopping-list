import React, { memo, useMemo, useRef, useCallback } from 'react';
import { useWindowDimensions, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import Item, { ITEMS_TABLE_NAME } from '../../../../models/Item';

import BottomSheet, {
  BottomSheetHandles,
} from '../../../../components/BottomSheet';

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

interface SaveItemProps {
  editItem?: Item;
  visible?: boolean;
  onClose?: () => void;
}

const SaveItem: React.FC<SaveItemProps> = ({ onClose, visible, editItem }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const database = useDatabase();

  const bottomSheetRef = useRef<BottomSheetHandles>(null);
  const categorySelectRef = useRef<CategorySelectHandles>(null);

  const inputValue = useRef(editItem?.title ?? '');

  const contentHeight = useMemo(() => height / 1.3, [height]);

  const handleChangeInputValue = useCallback(text => {
    inputValue.current = text;
  }, []);

  const handleSubmit = useCallback(async () => {
    if (
      !inputValue.current.trim().length ||
      !categorySelectRef.current?.selected
    ) {
      return;
    }

    try {
      if (editItem) {
        await database.action(async () => {
          await editItem.update(data => {
            Object.assign(data, {
              title: inputValue.current.trim(),
              category: categorySelectRef.current?.selected?.title,
            } as Item);
          });
        });
      } else {
        const collection = database.collections.get<Item>(ITEMS_TABLE_NAME);

        await database.action(async () => {
          await collection.create(item => {
            Object.assign(item, {
              title: inputValue.current.trim(),
              category: categorySelectRef.current?.selected?.title,
            } as Item);
          });
        });
      }

      inputValue.current = '';

      bottomSheetRef.current?.close();
    } catch (error) {
      Alert.alert('Ops, algo deu errado', 'Não foi possível salvar o item');
    }
  }, [database, editItem]);

  const handleCancel = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const afterClosed = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <BottomSheet ref={bottomSheetRef} isVisible={visible} onClose={afterClosed}>
      <Container style={{ height: contentHeight }}>
        <Title>{editItem ? 'Editar item' : 'Novo item'}</Title>

        <Input
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
    </BottomSheet>
  );
};

export default memo(SaveItem);
