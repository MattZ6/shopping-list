import React, { useMemo } from 'react';

import {
  Container,
  Content,
  Title,
  CountContainer,
  CheckIcon,
  Label,
  LabelBold,
} from './styles';

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
  const doneAll = useMemo(
    () => total > 0 && totalChecked > 0 && total === totalChecked,
    [total, totalChecked],
  );

  return (
    <Container>
      <Content>
        <Title numberOfLines={1}>{title}</Title>

        <CountContainer>
          {doneAll && <CheckIcon />}

          <Label>
            <LabelBold>{totalChecked}</LabelBold> de{' '}
            <LabelBold>{total}</LabelBold>
          </Label>
        </CountContainer>
      </Content>

      {/* Check Icon */}
    </Container>
  );
};

export default CategoryHeader;
