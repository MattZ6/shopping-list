import React, { useCallback, useState } from 'react';
import { useTheme } from 'styled-components/native';

import Fab from '../../components/Fab';
import SaveItem from '../../components/SaveItem';

import Header from './components/Header';
import ShoppingListItems from './components/ShoppingListItems';

import { Container, FabContainer } from './styles';

const ShoppingList: React.FC = () => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSaveItemBottomSheet = useCallback(() => setIsOpen(true), []);

  const handleCloseSaveItemBottomSheet = useCallback(
    () => setIsOpen(false),
    [],
  );

  return (
    <Container>
      <Header />

      <ShoppingListItems />

      <FabContainer>
        <Fab
          icon="add"
          backgroundColor={theme.colors.success}
          onPress={handleOpenSaveItemBottomSheet}
        />
      </FabContainer>

      <SaveItem visible={isOpen} onClose={handleCloseSaveItemBottomSheet} />
    </Container>
  );
};

export default ShoppingList;
