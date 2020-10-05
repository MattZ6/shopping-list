import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, ButtonContainer, ButtonContent, Title, Label } from './styles';

interface ShoppingList {
  title: string;

  hideBorder?: boolean;
}

const ShoppingList: React.FC<ShoppingList> = ({
  title,
  hideBorder = false,
}) => {
  return (
    <Button delayPressIn={60}>
      <ButtonContainer>
        <ButtonContent showBorder={!hideBorder}>
          <Title numberOfLines={2}>{title}</Title>
          <Label>16 itens</Label>
        </ButtonContent>

        <Icon name="chevron-right" size={24} color="#ccc" />
      </ButtonContainer>
    </Button>
  );
};

export default ShoppingList;
