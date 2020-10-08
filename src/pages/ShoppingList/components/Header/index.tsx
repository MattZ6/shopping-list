import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import IconButton from '../../../../components/IconButton';

import {
  Container,
  StatusBarSpace,
  Content,
  LeftButtons,
  RightButtons,
} from './styles';

const Header: React.FC = () => {
  const navigator = useNavigation();

  const handleBack = useCallback(() => navigator.goBack(), [navigator]);

  return (
    <Container>
      <StatusBarSpace />

      <Content>
        <LeftButtons>
          <IconButton icon="arrow-back" onPress={handleBack} />
        </LeftButtons>

        <RightButtons>
          {/* <IconButton icon="search" size="small" /> */}
          <IconButton icon="more-vert" />
        </RightButtons>
      </Content>
    </Container>
  );
};

export default Header;
