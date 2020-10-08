import React, { memo, useCallback } from 'react';
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
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  shoppingList,
  itemsCount,
  hideBorder = false,
}) => {
  const theme = useTheme();
  const navigator = useNavigation();

  const handleNavigate = useCallback(() => {
    navigator.navigate('shopping_list', { id: shoppingList.id });
  }, [navigator, shoppingList.id]);

  return (
    <Button
      delayPressIn={60}
      background={TouchableNativeFeedback.Ripple(theme.ripples.primary, false)}
      onPress={handleNavigate}
    >
      <ButtonContainer>
        <ButtonContent showBorder={!hideBorder}>
          <Title numberOfLines={2}>{shoppingList.title}</Title>
          <Label>{itemsCount} itens</Label>
        </ButtonContent>

        <Icon name="chevron-right" size={24} color="#ccc" />
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
