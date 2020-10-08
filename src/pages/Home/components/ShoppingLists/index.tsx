import React, { memo, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { Database } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';

import ShoppingList, {
  SHOPPING_LISTS_TABLE_NAME,
} from '../../../../models/ShoppingList';

import ShoppingListComponent from './components/ShoppingList';

import {
  Container,
  Header,
  Title,
  Description,
  List,
  Fab,
  FabButton,
  FabButtonContent,
  FabTitle,
} from './styles';

interface ShoppingListsProps {
  onAddPressed: () => void;
  database: Database;
  shopping_lists?: ShoppingList[];
}

const ShoppingLists: React.FC<ShoppingListsProps> = ({
  onAddPressed,
  shopping_lists = [],
}) => {
  const theme = useTheme();

  const shoppingListsCount = useMemo(() => shopping_lists?.length ?? 0, [
    shopping_lists,
  ]);

  return (
    <>
      <Container>
        <Header>
          <Title>Minhas listas</Title>
          <Description>
            Você pode clicar numa lista para ver seus itens
          </Description>
        </Header>

        <List
          data={shopping_lists}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ShoppingListComponent
              shoppingList={item}
              hideBorder={index === shoppingListsCount - 1}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Container>

      <Fab
        style={{
          shadowColor: theme.texts.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 4,
        }}
      >
        <FabButton delayPressIn={50} onPress={() => onAddPressed()}>
          <FabButtonContent>
            <Icon name="add" color={theme.texts.white} size={24} />

            <FabTitle numberOfLines={1}>Nova lista</FabTitle>
          </FabButtonContent>
        </FabButton>
      </Fab>
    </>
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
