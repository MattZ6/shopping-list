import React from 'react';

import Category from '../Category';

import { Container, Title, List, Separator } from './styles';

export interface ICategory {
  key: string;
  title: string;
  selected?: boolean;
}

const categories: ICategory[] = [
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

const CategorySelect: React.FC = () => {
  return (
    <Container>
      <Title>Categorias</Title>

      <List
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <Category category={item} />}
        ItemSeparatorComponent={() => <Separator />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default CategorySelect;
