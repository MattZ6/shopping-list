import React, { memo } from 'react';

import { ICategory } from '../CategorySelect';

import { Container, Button, ButtonContent, Title } from './styles';

interface CategoryProps {
  selected: boolean;
  category: ICategory;
  onSelect: (data: ICategory) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  selected,
  onSelect,
}) => {
  return (
    <Container selected={!!selected}>
      <Button delayPressIn={50} onPress={() => onSelect(category)}>
        <ButtonContent>
          <Title selected={!!selected}>{category.title}</Title>
        </ButtonContent>
      </Button>
    </Container>
  );
};

export default memo(Category);
