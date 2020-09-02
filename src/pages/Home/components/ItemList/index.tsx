import React from 'react';

import Item from '../Item';
import { IITem } from '../Item/types';

import { Container } from './styles';

interface ItemListProps {
  items: IITem[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <Container>
      {items.map(item => (
        <Item item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default ItemList;
