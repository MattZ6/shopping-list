import React, { useCallback, useState, memo } from 'react';

import { ICategory } from '../CategorySelect';

import { Container, Button, ButtonContent, Title } from './styles';

interface CategoryProps {
  category: ICategory;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const [data, setData] = useState(category);

  const handleSelect = useCallback(() => {
    setData(state => ({ ...state, selected: !state.selected }));
  }, []);

  return (
    <Container selected={!!data.selected}>
      <Button delayPressIn={50} onPress={handleSelect}>
        <ButtonContent>
          <Title selected={!!data.selected}>{data.title}</Title>
        </ButtonContent>
      </Button>
    </Container>
  );
};

export default memo(Category);
