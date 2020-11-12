import React, { memo, useRef, useCallback, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

import Item from '../../models/Item';

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

  const saveItemBottomSheetRef = useRef<Modalize>(null);

  const handleOpenSaveItemBottomSheet = useCallback(() => {
    saveItemBottomSheetRef?.current?.open();
  }, []);

  const handleCloseSaveItemBottomSheet = useCallback(() => {
    saveItemBottomSheetRef?.current?.close();
  }, []);

  return (
    <>
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
      </Container>

      <Modalize
        ref={saveItemBottomSheetRef}
        handlePosition="inside"
        adjustToContentHeight
      >
        <SaveItem
          shoppingListId={params.id}
          onClose={handleCloseSaveItemBottomSheet}
        />
      </Modalize>
    </>
  );
};

export default memo(ShoppingList);
