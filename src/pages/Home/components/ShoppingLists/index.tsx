import React, { memo } from 'react';
import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import { View } from 'react-native';
import ShoppingList, {
  SHOPPING_LISTS_TABLE_NAME,
} from '../../../../models/ShoppingList';

import ShoppingListComponent from './components/ShoppingList';

import { Container } from './styles';

interface ShoppingListsProps {
  database: Database;
  shopping_lists?: ShoppingList[];
  onShoppingListLongPress: (data: ShoppingList) => void;
}

const ShoppingLists: React.FC<ShoppingListsProps> = ({
  shopping_lists,
  onShoppingListLongPress,
}) => {
  if (!shopping_lists) {
    return <View style={{ height: 720 }}>CARREGANDO</View>;
  }

  return (
    <Container>
      {shopping_lists.map((shoppingList, index) => (
        <ShoppingListComponent
          key={shoppingList.id}
          shoppingList={shoppingList}
          hideBorder={index === (shopping_lists?.length ?? 0) - 1}
          onLongPress={onShoppingListLongPress}
        />
      ))}
    </Container>
  );
};

const enhance = withObservables(
  ['shopping_lists'],
  ({ database }: ShoppingListsProps) => ({
    shopping_lists: database.collections
      .get<ShoppingList>(SHOPPING_LISTS_TABLE_NAME)
      .query()
      .observeWithColumns(['title']),
  }),
);

export default memo(withDatabase(enhance(ShoppingLists)));
