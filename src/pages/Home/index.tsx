import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';

import IconButton from '../../components/IconButton';
import SaveItem from './components/SaveItem';

import Header from './components/Header';
import ShoppingListItems from './components/ShoppingListItems';

import { Container, FabContainer } from './styles';

const Home: React.FC = () => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Header />

      <ShoppingListItems />

      <FabContainer>
        <IconButton
          icon="add"
          withElevation
          backgroundColor={theme.colors.success}
          onPress={() => setIsOpen(true)}
        />
      </FabContainer>

      <SaveItem visible={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
};

export default Home;
