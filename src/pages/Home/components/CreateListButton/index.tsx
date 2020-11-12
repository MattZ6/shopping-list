import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import { Container, Button, Content, Title } from './styles';

interface CreateListButtonProps {
  onPress: () => void;
}

const CreateListButton: React.FC<CreateListButtonProps> = ({ onPress }) => {
  const theme = useTheme();

  return (
    <Container
      style={{
        shadowColor: theme.texts.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
      }}
    >
      <Button delayPressIn={50} onPress={onPress}>
        <Content>
          <Icon name="add" color={theme.texts.white} size={24} />

          <Title numberOfLines={1}>Nova lista</Title>
        </Content>
      </Button>
    </Container>
  );
};

export default CreateListButton;
