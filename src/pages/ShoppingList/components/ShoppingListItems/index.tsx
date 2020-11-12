import React, { useMemo, memo, useState, useCallback, useRef } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import { Modalize } from 'react-native-modalize';

import Item, { ITEMS_TABLE_NAME } from '../../../../models/Item';

import OptionsBottomSheet from '../../../../components/OptionsBottomSheet';
import SaveItem from '../../../../components/SaveItem';

import ScreenState from '../../../../components/ScreenState';
import ScreenHeader from '../Toolbar';

import CategoryHeader from './components/CategoryHeader';
import ShoppingListHeader from './components/ShoppingListHeader';
import CategoryItems from './components/CategoryItems';

import { Container, Wrapper, List, Loader, Spacer } from './styles';

export interface Section {
  key: string;
  render: () => JSX.Element;
  isHeader?: boolean;
}

interface ShoppingListItemsProps {
  database: Database;
  items?: Item[];
  shoppingListId: string;
  shoppingListTitle: string;
}

const ShoppingListItems: React.FC<ShoppingListItemsProps> = ({
  items,
  shoppingListId,
  shoppingListTitle,
}) => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  const [scrollY] = useState(new Animated.Value(0));

  const saveItemBottomSheetRef = useRef<Modalize>(null);
  const optionBottomSheetRef = useRef<Modalize>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.setValue(event.nativeEvent.contentOffset.y);
    },
    [scrollY],
  );

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleDeleteItem = useCallback(async () => {
    if (!selectedItem) {
      return;
    }

    try {
      await selectedItem.delete();

      setSelectedItem(null);
    } catch (error) {
      Alert.alert(
        'Falha ao deletar',
        'Não foi possível deletar o item. Por favor, tente novamente',
      );
    }
  }, [selectedItem]);

  const handleOpenSaveItemBottomSheet = useCallback(() => {
    saveItemBottomSheetRef.current?.open();
  }, []);

  const handleCloseSaveItemBottomSheet = useCallback(() => {
    saveItemBottomSheetRef.current?.close();

    setSelectedItem(null);
  }, []);

  const handleOpenOptionBottomSheet = useCallback((data: Item) => {
    optionBottomSheetRef?.current?.open();

    setSelectedItem(data);
  }, []);

  const handleOptionBottomSheetSelection = useCallback(
    (type: 'edit' | 'delete') => {
      optionBottomSheetRef?.current?.close();

      if (type === 'edit') {
        handleOpenSaveItemBottomSheet();
      } else if (type === 'delete') {
        handleDeleteItem();
      }
    },
    [handleOpenSaveItemBottomSheet, handleDeleteItem],
  );

  const handleClearCurrentItem = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const countLabel = useMemo(() => {
    if (!items) {
      return 'Nenhum item';
    }

    return `${items.length} ite${items.length > 1 ? 'ns' : 'm'}`;
  }, [items]);

  const listData = useMemo(() => {
    if (!items) {
      return null;
    }

    const categories: string[] = [];

    items.forEach(
      item =>
        !categories.includes(item.category) && categories.push(item.category),
    );

    const renderItems: Section[] = [];

    renderItems.push({
      key: 'SHOPPING_LIST_HEADER',
      render: () => (
        <ShoppingListHeader
          title={shoppingListTitle}
          description={countLabel}
          scrollY={scrollY}
        />
      ),
    });

    categories.forEach(category => {
      const categoryItems = items.filter(
        item => item.category.toUpperCase() === category.toUpperCase(),
      );

      const total = categoryItems.length;
      const totalChecked = categoryItems.filter(item => !!item.is_checked)
        .length;

      const categoryKey = category.split(' ').join('_').toUpperCase();

      renderItems.push({
        key: categoryKey,
        isHeader: true,
        render: () => (
          <CategoryHeader
            title={category}
            total={total}
            totalChecked={totalChecked}
          />
        ),
      });

      renderItems.push({
        key: `${categoryKey}_ITEMS`,
        render: () => (
          <CategoryItems
            items={categoryItems}
            onItemLongPress={handleOpenOptionBottomSheet}
          />
        ),
      });
    });

    const stickyIndices: number[] = [];

    renderItems.forEach(
      (item, index) => item.isHeader && stickyIndices.push(index),
    );

    return { items: renderItems, stickyIndices };
  }, [
    items,
    shoppingListTitle,
    scrollY,
    countLabel,
    handleOpenOptionBottomSheet,
  ]);

  const spacerHeight = useMemo(() => {
    const TOOLBAR_HEIGHT = 80;
    const HEADER_HEIGHT = 140;
    const OFFSET = 64;

    const sectionSpacers = (listData?.stickyIndices.length ?? 0) * 80;
    const itemsHeight = (items?.length ?? 0) * 56;

    const total =
      SCREEN_HEIGHT +
      TOOLBAR_HEIGHT -
      HEADER_HEIGHT -
      OFFSET -
      sectionSpacers -
      itemsHeight;

    return total <= 56 ? 56 : total;
  }, [SCREEN_HEIGHT, listData, items]);

  if (!items || !listData)
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Loader size={34} />
      </Container>
    );

  if (!items.length)
    return (
      <>
        <StatusBar barStyle="dark-content" />

        <ScreenHeader title={shoppingListTitle} invertedColors />

        <Container>
          <ScreenState
            icon="remove-shopping-cart"
            title="A lista não possui itens"
            description="O que acha de adicionar alguns?"
          />
        </Container>
      </>
    );

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Wrapper>
        <ScreenHeader title={shoppingListTitle} scrollY={scrollY} />

        <List
          data={listData.items}
          overScrollMode="never"
          keyExtractor={item => item.key}
          renderItem={({ item }) => item.render()}
          stickyHeaderIndices={listData.stickyIndices}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          ListFooterComponent={() => <Spacer height={spacerHeight} />}
          onScroll={handleScroll}
        />
      </Wrapper>

      <Modalize
        ref={saveItemBottomSheetRef}
        handlePosition="inside"
        adjustToContentHeight
        onClosed={handleClearCurrentItem}
      >
        <SaveItem
          shoppingListId={shoppingListId}
          item={selectedItem}
          onClose={handleCloseSaveItemBottomSheet}
        />
      </Modalize>

      <Modalize
        ref={optionBottomSheetRef}
        handlePosition="inside"
        adjustToContentHeight
      >
        <OptionsBottomSheet onSelect={handleOptionBottomSheetSelection} />
      </Modalize>
    </>
  );
};

const enhance = withObservables(
  ['items', 'shoppingListId'],
  ({ database, shoppingListId }: ShoppingListItemsProps) => ({
    items: database.collections
      .get<Item>(ITEMS_TABLE_NAME)
      .query(Q.where('shopping_list_id', shoppingListId))
      .observeWithColumns(['is_checked', 'category']),
  }),
);

export default memo(withDatabase(enhance(ShoppingListItems)));
