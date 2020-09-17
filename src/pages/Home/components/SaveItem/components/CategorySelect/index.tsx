import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import Category from '../Category';

import { Container, Title, List, Separator } from './styles';

export interface CategorySelectHandles {
  selected?: ICategory;
}

export interface ICategory {
  key: string;
  title: string;
  selected?: boolean;
}

const stored_categories: ICategory[] = [
  {
    key: 'banheiro',
    title: 'Banheiro',
  },
  {
    key: 'cozinha',
    title: 'Cozinha',
  },
  {
    key: 'limpeza',
    title: 'Limpeza',
  },
  {
    key: 'maquiagem',
    title: 'Maquiagem',
  },
  {
    key: 'material_escolar',
    title: 'Material escolar',
  },
];

interface CategorySelectProps {
  selectedCategory?: string;
}

const CategorySelect: React.ForwardRefRenderFunction<
  CategorySelectHandles,
  CategorySelectProps
> = ({ selectedCategory }, ref) => {
  const [selected, setSelected] = useState<ICategory | undefined>(() => {
    return stored_categories.find(
      category =>
        category.title.toUpperCase() === selectedCategory?.toUpperCase(),
    );
  });

  const handleSelect = useCallback((category: ICategory) => {
    setSelected(category);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      selected,
    }),
    [selected],
  );

  return (
    <Container>
      <Title>Categorias</Title>

      <List
        keyboardShouldPersistTaps="handled"
        data={stored_categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            category={item}
            selected={item.key === selected?.key}
            onSelect={() => handleSelect(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default forwardRef(CategorySelect);
