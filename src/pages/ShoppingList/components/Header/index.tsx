import React, { useCallback } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconButton from '../../../../components/IconButton';

import {
  Container,
  StatusBarSpace,
  Content,
  ButtonsContainer,
  Title,
} from './styles';

interface HeaderProps {
  title?: string;
  titleStyle?: any;
  // titleStyle?: StyleProp<TextStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, titleStyle = {} }) => {
  const navigator = useNavigation();

  const handleBack = useCallback(() => navigator.goBack(), [navigator]);

  return (
    <Container>
      <StatusBarSpace />

      <Content>
        <ButtonsContainer>
          <IconButton icon="arrow-back" onPress={handleBack} />
        </ButtonsContainer>

        {title && (
          <Title numberOfLines={1} style={[titleStyle]}>
            {title}
          </Title>
        )}

        <ButtonsContainer>
          <IconButton icon="more-vert" />
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export default Header;
