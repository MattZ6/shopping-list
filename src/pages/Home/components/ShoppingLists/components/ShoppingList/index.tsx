import React, { memo, useCallback, useMemo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import withObservables from '@nozbe/with-observables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import ShoppingListModel from '../../../../../../models/ShoppingList';

import { Button, ButtonContainer, ButtonContent, Title, Label } from './styles';

interface ShoppingListProps {
  shoppingList: ShoppingListModel;
  itemsCount?: number;

  hideBorder?: boolean;
  onLongPress: (data: ShoppingListModel) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  shoppingList,
  itemsCount,
  hideBorder = false,
  onLongPress,
}) => {
  const theme = useTheme();
  const navigator = useNavigation();

  const handleNavigateToShoppingListScreen = useCallback(() => {
    navigator.navigate('shopping_list', {
      id: shoppingList.id,
      title: shoppingList.title,
    });
  }, [navigator, shoppingList.id, shoppingList.title]);

  const itemsCountLabel = useMemo(() => {
    if (!itemsCount) {
      return 'Sem itens no momento';
    }

    return `${itemsCount} ite${itemsCount > 1 ? 'ns' : 'm'}`;
  }, [itemsCount]);

  return (
    <Button
      delayPressIn={60}
      background={TouchableNativeFeedback.Ripple(theme.ripples.primary, false)}
      onPress={handleNavigateToShoppingListScreen}
      onLongPress={() => onLongPress(shoppingList)}
    >
      <ButtonContainer>
        <ButtonContent showBorder={!hideBorder}>
          <Title numberOfLines={1}>{shoppingList.title}</Title>
          <Label>{itemsCountLabel}</Label>
        </ButtonContent>

        <Icon
          name="chevron-right"
          size={24}
          color={theme.texts.tertiaryLight}
        />
      </ButtonContainer>
    </Button>
  );
};

const enhance = withObservables(
  ['shoppingList'],
  ({ shoppingList }: ShoppingListProps) => ({
    shoppingList,
    itemsCount: shoppingList.items_count,
  }),
);

export default memo(enhance(ShoppingList));
