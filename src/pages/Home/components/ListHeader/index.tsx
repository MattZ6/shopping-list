import React from 'react';

import { Container, Content, Title, Label, LabelBold } from './styles';

interface ListHeaderProps {
  title: string;
  total: number;
  totalChecked: number;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  total = 0,
  totalChecked = 0,
}) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>

        <Label>
          <LabelBold>{total}</LabelBold> de{' '}
          <LabelBold>{totalChecked}</LabelBold>
        </Label>
      </Content>

      {/* Check Icon */}
    </Container>
  );
};

export default ListHeader;
