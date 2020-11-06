import React, { useCallback, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useRoute } from '@react-navigation/native';

import Fab from '../../components/Fab';
import SaveItem from '../../components/SaveItem';

import ShoppingListItems from './components/ShoppingListItems';

import { Container, FabContainer } from './styles';

interface RouteParams {
  id: string;
  title: string;
}

const ShoppingList: React.FC = () => {
  const theme = useTheme();

  const route = useRoute();

  const params = route.params as RouteParams;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSaveItemBottomSheet = useCallback(() => setIsOpen(true), []);

  const handleCloseSaveItemBottomSheet = useCallback(
    () => setIsOpen(false),
    [],
  );

  return (
    <Container>
      <ShoppingListItems
        shoppingListId={params.id}
        shoppingListTitle={params.title}
      />

      <FabContainer>
        <Fab
          icon="add"
          backgroundColor={theme.colors.success}
          onPress={handleOpenSaveItemBottomSheet}
        />
      </FabContainer>

      <SaveItem
        visible={isOpen}
        shoppingListId={params.id}
        onClose={handleCloseSaveItemBottomSheet}
      />
    </Container>
  );
};

export default ShoppingList;
