import React, {
  memo,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Alert, Insets, TextInput } from 'react-native';
import { useTheme } from 'styled-components';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import Item, { ITEMS_TABLE_NAME } from '../../models/Item';

import Category from './components/Category';

import {
  Container,
  Title,
  Input,
  SelectContainer,
  SelectLabel,
  SelectList,
  SelectListSeparator,
  ButtonsContainer,
  CancelButton,
  SubmitButton,
} from './styles';

export interface ICategory {
  key: string;
  title: string;
  selected?: boolean;
}

const stored_categories: ICategory[] = [
  {
    key: 'higiene_pessoal',
    title: 'Higiêne pessoal',
  },
  {
    key: 'materiais_de_limpeza',
    title: 'Materiais de limpeza',
  },
  {
    key: 'frios',
    title: 'Frios',
  },
  {
    key: 'frutas_e_verduras',
    title: 'Frutas & Verduras',
  },
  {
    key: 'produtos_em_geral',
    title: 'Produtos em geral 🤷🏻‍♀️',
  },
];

const hitSlop: Insets = { top: 10, right: 10, bottom: 10, left: 10 };

interface SaveItemProps {
  shoppingListId: string;
  item?: Item | null;
  onClose: () => void;
}

const SaveItem: React.FC<SaveItemProps> = ({
  onClose,
  shoppingListId,
  item: currentItem,
}) => {
  const theme = useTheme();

  const database = useDatabase();

  const titleInputRef = useRef<TextInput>(null);
  const [title, setTitle] = useState(currentItem?.title ?? '');

  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(() =>
    stored_categories.find(
      category =>
        category.title.toUpperCase() === currentItem?.category.toUpperCase(),
    ),
  );

  const handleSubmit = useCallback(async () => {
    try {
      await database.action(async () => {
        if (currentItem) {
          await currentItem.update(data => {
            Object.assign(data, {
              title: title.trim(),
              category: selectedCategory?.title,
            } as Item);
          });
        } else {
          const collection = database.collections.get<Item>(ITEMS_TABLE_NAME);

          await collection.create(item => {
            Object.assign(item, {
              title: title.trim(),
              category: selectedCategory?.title,
              shopping_list_id: shoppingListId,
            } as Item);
          });
        }
      });

      onClose();
    } catch (error) {
      Alert.alert('Ops, algo deu errado', 'Não foi possível salvar o item');
    }
  }, [title, selectedCategory, database, currentItem, shoppingListId, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const bottomSheetTitle = useMemo(
    () => (currentItem ? 'Editar item' : 'Novo item'),
    [currentItem],
  );

  const submitButtonDisabled = useMemo(() => {
    const hasTitle = title.trim().length > 0;
    const hasCategory = !!selectedCategory;

    return !hasTitle || !hasCategory;
  }, [title, selectedCategory]);

  useEffect(() => {
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Container>
      <Title>{bottomSheetTitle}</Title>

      <Input
        ref={titleInputRef as any}
        value={title}
        onChangeText={setTitle}
        placeholder="Qual o nome do item?"
        placeholderTextColor={theme.texts.primaryLight}
      />

      <SelectContainer>
        <SelectLabel>Categorias</SelectLabel>

        <SelectList
          keyboardShouldPersistTaps="handled"
          data={stored_categories}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Category
              category={item}
              selected={item.key === selectedCategory?.key}
              onSelect={() => setSelectedCategory(item)}
            />
          )}
          ItemSeparatorComponent={() => <SelectListSeparator />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SelectContainer>

      <ButtonsContainer>
        <CancelButton hitSlop={hitSlop} onPress={handleCancel}>
          Cancelar
        </CancelButton>

        <SubmitButton
          hitSlop={hitSlop}
          onPress={handleSubmit}
          disabled={submitButtonDisabled}
        >
          Salvar
        </SubmitButton>
      </ButtonsContainer>
    </Container>
  );
};

export default memo(SaveItem);
