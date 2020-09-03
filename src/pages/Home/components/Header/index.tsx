import React from 'react';

import IconButton from '../../../../components/IconButton';

import {
  Container,
  StatusBarSpace,
  Content,
  LeftButtons,
  RightButtons,
} from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <StatusBarSpace />

      <Content>
        <LeftButtons>{/* <IconButton icon="edit" /> */}</LeftButtons>

        <RightButtons>
          <IconButton icon="search" />
          <IconButton icon="more-vert" />
        </RightButtons>
      </Content>
    </Container>
  );
};

export default Header;
