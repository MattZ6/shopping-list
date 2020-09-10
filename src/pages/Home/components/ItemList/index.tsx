import React, { useMemo } from 'react';

import Item from '../Item';
import { IITem } from '../Item/types';

import { Container } from './styles';

interface ItemListProps {
  items: IITem[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const itemsCount = useMemo(() => items.length, [items]);

  return (
    <Container>
      {items.map((item, index) => (
        <Item item={item} key={item.id} hideBorder={index === itemsCount - 1} />
      ))}
    </Container>
  );
};

export default ItemList;
