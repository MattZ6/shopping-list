import React from 'react';

import { Container, Content, Title, Label, LabelBold } from './styles';

interface CategoryHeaderProps {
  title: string;
  total: number;
  totalChecked: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  total = 0,
  totalChecked = 0,
}) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>

        <Label>
          <LabelBold>{totalChecked}</LabelBold> de{' '}
          <LabelBold>{total}</LabelBold>
        </Label>
      </Content>

      {/* Check Icon */}
    </Container>
  );
};

export default CategoryHeader;
