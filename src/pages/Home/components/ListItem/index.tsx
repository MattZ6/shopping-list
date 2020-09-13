import React, { useCallback, memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';

import { toggleItem } from '../../../../store/modules/items/actions';

import { Item } from '../../../../atoms/items';
// import useItems from '../../../../hooks/items';

import {
  Container,
  Wrapper,
  Content,
  Title,
  CheckBoxContainer,
} from './styles';

interface ListItemProps {
  item: Item;
  hideBorder?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ item, hideBorder = false }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  // const { toggleItem } = useItems();

  const toggleCheck = useCallback(() => {
    dispatch(toggleItem(item.key));
  }, [dispatch, item.key]);

  // const toggleCheck = useCallback(() => {
  //   toggleItem(item.key);
  // }, [toggleItem, item.key]);

  return (
    <Container
      delayPressIn={60}
      onPress={toggleCheck}
      background={TouchableNativeFeedback.Ripple(theme.ripples.primary, false)}
    >
      <Wrapper>
        <Content showBorder={!hideBorder}>
          <Title numberOfLines={1}>{item.title}</Title>

          <CheckBoxContainer>
            <CheckBox
              disabled
              value={item.selected}
              onValueChange={toggleCheck}
              tintColors={{
                true: theme.colors.primary,
                false: theme.texts.tertiary,
              }}
            />
          </CheckBoxContainer>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default memo(ListItem);
