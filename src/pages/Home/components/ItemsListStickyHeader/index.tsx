import React, { memo } from 'react';

import { Container, Content, Title, Description } from './styles';

interface ItemsListStickyHeaderProps {
  title: string;
  description: string;
}

const ItemsListStickyHeader: React.FC<ItemsListStickyHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Container>
  );
};

export default memo(ItemsListStickyHeader);
