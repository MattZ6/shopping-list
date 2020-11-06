import React, { useMemo, memo, useState, useCallback } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import Item, { ITEMS_TABLE_NAME } from '../../../../models/Item';

import ScreenState from '../../../../components/ScreenState';
import ScreenHeader from '../Header';

import CategoryHeader from './components/CategoryHeader';
import CategoryItems from './components/CategoryItems';

import {
  Container,
  Wrapper,
  Header,
  Title,
  Description,
  List,
  Loader,
  Spacer,
} from './styles';

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
  shoppingListTitle,
}) => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  const [scrollY] = useState(new Animated.Value(0));

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.setValue(event.nativeEvent.contentOffset.y);
    },
    [scrollY],
  );

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
        <Header>
          <Title
            numberOfLines={2}
            style={{
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [60, 90],
                    outputRange: [0, -2],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [60, 90],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            {shoppingListTitle}
          </Title>
          <Description
            numberOfLines={1}
            style={{
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [60, 90],
                    outputRange: [0, -2],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [60, 90],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            {countLabel}
          </Description>
        </Header>
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
        render: () => <CategoryItems items={categoryItems} />,
      });
    });

    const stickyIndices: number[] = [];

    renderItems.forEach(
      (item, index) => item.isHeader && stickyIndices.push(index),
    );

    return { items: renderItems, stickyIndices };
  }, [items, shoppingListTitle, scrollY, countLabel]);

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
        <Loader size={34} />
      </Container>
    );

  if (!items.length)
    return (
      <Container>
        <ScreenState
          icon="subject"
          title="A lista não possui itens"
          description="Para adiciona-los clique em +"
        />
      </Container>
    );

  return (
    <Wrapper>
      <ScreenHeader
        title={shoppingListTitle}
        titleStyle={{
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [85, 110],
                outputRange: [4, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [85, 110],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      />

      <List
        data={listData.items}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={listData.stickyIndices}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ListFooterComponent={() => <Spacer height={spacerHeight} />}
        onScroll={handleScroll}
      />
    </Wrapper>
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
