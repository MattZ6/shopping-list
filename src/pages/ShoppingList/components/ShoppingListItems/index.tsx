import React, { useMemo, memo } from 'react';
import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import Item, { ITEMS_TABLE_NAME } from '../../../../models/Item';

import ScreenState from '../../../../components/ScreenState';

import CategoryHeader from './components/CategoryHeader';
import CategoryItems from './components/CategoryItems';

import { Container, List, Loader } from './styles';

export interface Section {
  key: string;
  render: () => JSX.Element;
  isHeader?: boolean;
}

interface ShoppingListItemsProps {
  database: Database;
  items?: Item[];
  shoppingListId: string;
}

const ShoppingListItems: React.FC<ShoppingListItemsProps> = ({ items }) => {
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
  }, [items]);

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
    <List
      showsVerticalScrollIndicator={false}
      data={listData.items}
      keyExtractor={item => item.key}
      renderItem={({ item }) => item.render()}
      stickyHeaderIndices={listData.stickyIndices}
    />
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
