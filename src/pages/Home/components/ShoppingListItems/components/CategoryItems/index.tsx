import React, { memo } from 'react';

import ListItem from './components/CategoryItem';
import Item from '../../../../../../models/Item';

import { Container } from './styles';

interface CategoryItemsProps {
  items: Item[];
}

const CategoryItems: React.FC<CategoryItemsProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          item={item}
          hideBorder={index === items.length - 1}
        />
      ))}
    </Container>
  );
};

export default memo(CategoryItems);
