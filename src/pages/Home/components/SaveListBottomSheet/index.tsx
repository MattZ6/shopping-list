import { useDatabase } from '@nozbe/watermelondb/hooks';
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
  useRef,
} from 'react';
import { useWindowDimensions, TextInput, Alert } from 'react-native';
import { useTheme } from 'styled-components';

import BottomSheet, {
  BottomSheetHandles,
} from '../../../../components/BottomSheet';
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
  isVisible: boolean;
  onClose: () => void;
}

const SaveListBottomSheet: React.FC<SaveListBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const [value, setValue] = useState('');

  const database = useDatabase();

  const theme = useTheme();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const bottomSheetRef = useRef<BottomSheetHandles>(null);
  const inputRef = useRef<TextInput>(null);

  const isButtonDisabled = useMemo(() => value.trim().length === 0, [value]);

  const handleClose = useCallback(() => {
    setValue('');
    onClose();
  }, [onClose]);

  const handleCancel = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isButtonDisabled) {
      return;
    }

    try {
      await database.action(async () => {
        // if (editItem) {
        //   await editItem.update(data => {
        //     Object.assign(data, {
        //       title: inputValue.current.trim(),
        //       category: categorySelectRef.current?.selected?.title,
        //     } as Item);
        //   });
        // } else {
        const collection = database.collections.get<ShoppingList>(
          SHOPPING_LISTS_TABLE_NAME,
        );

        await collection.create(shoppingList => {
          Object.assign(shoppingList, {
            title: value,
          } as ShoppingList);
        });
        // }
      });

      bottomSheetRef.current?.close();
    } catch (error) {
      Alert.alert('Ops, algo deu errado', 'Não foi possível salvar o item');
    }
  }, [database, isButtonDisabled, value]);

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      isVisible={isVisible}
      onClose={handleClose}
    >
      <Container style={{ height: SCREEN_HEIGHT - 80 }}>
        <Title>Nova lista</Title>

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
    </BottomSheet>
  );
};

export default memo(SaveListBottomSheet);
