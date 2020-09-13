import React from 'react';

import ListItem from '../ListItem';
import { Item } from '../../../../atoms/items';

import { Container } from './styles';

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <ListItem
          key={item.key}
          item={item}
          hideBorder={index === items.length - 1}
        />
      ))}
    </Container>
  );
};

export default ItemList;
