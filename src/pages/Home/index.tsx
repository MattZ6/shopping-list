/* eslint-disable jsx-a11y/accessible-emoji */
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert,
  Dimensions,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Modalize } from 'react-native-modalize';
import { Database } from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ShoppingList, {
  SHOPPING_LISTS_TABLE_NAME,
} from '../../models/ShoppingList';

import IconButton from '../../components/IconButton';
import OptionsBottomSheet from '../../components/OptionsBottomSheet';

import Header from './components/Header';
import { HOME_HEADER_HEIGHT } from './components/Header/styles';

import ItemsListStickyHeader from './components/ItemsListStickyHeader';
import { ITEMS_LIST_STICKY_HEADER_HEIGHT } from './components/ItemsListStickyHeader/styles';

import ShoppingLists from './components/ShoppingLists';
import { SHOPPING_LIST_HEIGHT } from './components/ShoppingLists/components/ShoppingList/styles';

import CreateListButton from './components/CreateListButton';
import SaveListBottomSheet from './components/SaveListBottomSheet';

import {
  Container,
  Toolbar,
  TOOLBAR_HEIGHT,
  ToolbarContent,
  Scroll,
  ScrollItem,
  Spacer,
  EmptyListContainer,
  EmptyListTitle,
  EmptyListDescription,
  EmptyListButtonWrapper,
  EmptyListTouchable,
  EmptyListTouchableContent,
  EmptyListTouchableContentTitle,
} from './styles';

interface HomeProps {
  shoppingListsCount: number;
  database: Database;
}

const Home: React.FC<HomeProps> = ({ shoppingListsCount }) => {
  const theme = useTheme();

  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  const [
    selectedShoppingList,
    setSelectedShoppingList,
  ] = useState<ShoppingList | null>(null);

  const saveShoppingListBottomSheetRef = useRef<Modalize>(null);
  const optionsBottomSheetRef = useRef<Modalize>(null);

  const [scrollY] = useState(new Animated.Value(0));

  const handleDeleteShoppingList = useCallback(async () => {
    if (!selectedShoppingList) {
      return;
    }

    try {
      await selectedShoppingList.delete();

      setSelectedShoppingList(null);
    } catch (error) {
      Alert.alert(
        'Falha ao deletar',
        'Não foi possível deletar esta lista. Por favor, tente novamente',
      );
    }
  }, [selectedShoppingList]);

  const handleOpenSaveShoppingListBottomSheetForCreate = useCallback(() => {
    setSelectedShoppingList(null);

    saveShoppingListBottomSheetRef.current?.open();
  }, []);

  const handleOpenSaveShoppingListBottomSheetForEdit = useCallback(() => {
    saveShoppingListBottomSheetRef.current?.open();
  }, []);

  const handleCloseSaveShoppingListBottomSheet = useCallback(() => {
    saveShoppingListBottomSheetRef.current?.close();

    setSelectedShoppingList(null);
  }, []);

  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.setValue(nativeEvent.contentOffset.y);
    },
    [scrollY],
  );

  const handleSearchButtonPressed = useCallback(() => {
    // TODO
  }, []);

  const handleOpenOptionsBottomSheet = useCallback((data: ShoppingList) => {
    optionsBottomSheetRef?.current?.open();

    setSelectedShoppingList(data);
  }, []);

  const handleSelectOption = useCallback(
    (type: 'edit' | 'delete') => {
      optionsBottomSheetRef?.current?.close();

      if (type === 'edit') {
        handleOpenSaveShoppingListBottomSheetForEdit();
      } else if (type === 'delete') {
        handleDeleteShoppingList();
      }
    },
    [handleOpenSaveShoppingListBottomSheetForEdit, handleDeleteShoppingList],
  );

  const handleClearCurrentShoppingList = useCallback(() => {
    setSelectedShoppingList(null);
  }, []);

  const { data, stickyHeaderIndices } = useMemo(() => {
    const components = [
      {
        key: 'HEADER',
        render: () => (
          <Header
            scrollY={scrollY}
            onSearchButtonPress={handleSearchButtonPressed}
          />
        ),
      },
      {
        isSticky: true,
        key: 'LIST_ITEMS_HEADER_KEY',
        render: () => (
          <ItemsListStickyHeader
            title="Minhas listas"
            description="Você pode clicar numa lista para ver seus itens"
          />
        ),
      },
      {
        key: 'ITEMS_LIST',
        render: () => (
          <ShoppingLists
            onShoppingListLongPress={handleOpenOptionsBottomSheet}
          />
        ),
      },
    ] as ScrollItem[];

    const indices: number[] = [];

    components.forEach((x, index) => x.isSticky && indices.push(index));

    return {
      data: components,
      stickyHeaderIndices: indices,
    };
  }, [handleSearchButtonPressed, handleOpenOptionsBottomSheet, scrollY]);

  const spacerHeight = useMemo(() => {
    const itemsHeight = (shoppingListsCount ?? 10) * SHOPPING_LIST_HEIGHT;

    const total =
      SCREEN_HEIGHT +
      TOOLBAR_HEIGHT -
      HOME_HEADER_HEIGHT -
      ITEMS_LIST_STICKY_HEADER_HEIGHT -
      itemsHeight;

    return total <= 72 ? 72 : total;
  }, [SCREEN_HEIGHT, shoppingListsCount]);

  return (
    <>
      <Container>
        <Toolbar>
          <ToolbarContent>
            <IconButton icon="more-vert" iconColor={theme.texts.white} />
          </ToolbarContent>
        </Toolbar>

        {shoppingListsCount > 0 ? (
          <>
            <Scroll
              overScrollMode="never"
              scrollEventThrottle={16}
              renderToHardwareTextureAndroid
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              ListFooterComponent={() => <Spacer height={spacerHeight} />}
              data={data}
              keyExtractor={item => item.key}
              renderItem={({ item }) => item.render()}
              stickyHeaderIndices={stickyHeaderIndices}
            />

            <CreateListButton
              onPress={handleOpenSaveShoppingListBottomSheetForCreate}
            />
          </>
        ) : (
          <EmptyListContainer>
            <Icon
              name="local-mall"
              // name="add-shopping-cart"
              size={80}
              color={theme.backgrounds.default}
            />

            <EmptyListTitle>
              Você ainda não possui listas de compras
            </EmptyListTitle>
            <EmptyListDescription>
              O que acha de começar criando uma?
            </EmptyListDescription>

            <EmptyListButtonWrapper>
              <EmptyListTouchable
                delayPressIn={50}
                onPress={handleOpenSaveShoppingListBottomSheetForCreate}
              >
                <EmptyListTouchableContent>
                  <EmptyListTouchableContentTitle>
                    Claro, vamos lá! ✍🏻
                  </EmptyListTouchableContentTitle>
                </EmptyListTouchableContent>
              </EmptyListTouchable>
            </EmptyListButtonWrapper>
          </EmptyListContainer>
        )}
      </Container>

      <Modalize
        ref={saveShoppingListBottomSheetRef}
        handlePosition="inside"
        adjustToContentHeight
        onClosed={handleClearCurrentShoppingList}
      >
        <SaveListBottomSheet
          shoppingList={selectedShoppingList}
          onClose={handleCloseSaveShoppingListBottomSheet}
        />
      </Modalize>

      <Modalize
        ref={optionsBottomSheetRef}
        handlePosition="inside"
        adjustToContentHeight
      >
        <OptionsBottomSheet onSelect={handleSelectOption} />
      </Modalize>
    </>
  );
};

const enhance = withObservables(
  ['shoppingListsCount'],
  ({ database }: HomeProps) => ({
    shoppingListsCount: database.collections
      .get<ShoppingList>(SHOPPING_LISTS_TABLE_NAME)
      .query()
      .observeCount(),
  }),
);

export default memo(withDatabase(enhance(Home)));
