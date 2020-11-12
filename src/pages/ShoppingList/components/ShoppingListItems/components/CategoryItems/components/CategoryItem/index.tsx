import React, { useCallback, memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import withObservables from '@nozbe/with-observables';

import Item from '../../../../../../../../models/Item';

import {
  Container,
  Wrapper,
  Content,
  Title,
  CheckBoxContainer,
} from './styles';

interface CategoryItemProps {
  item: Item;
  hideBorder?: boolean;
  onLongPress: (data: Item) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  hideBorder = false,
  onLongPress,
}) => {
  const theme = useTheme();

  const handleToggleCheck = useCallback(async () => {
    await item.toggleCheck();
  }, [item]);

  return (
    <Container
      delayPressIn={60}
      background={TouchableNativeFeedback.Ripple(theme.ripples.primary, false)}
      onPress={handleToggleCheck}
      onLongPress={() => onLongPress(item)}
    >
      <Wrapper>
        <Content showBorder={!hideBorder}>
          <Title numberOfLines={1}>{item.title}</Title>

          <CheckBoxContainer>
            <CheckBox
              disabled
              value={!!item.is_checked}
              tintColors={{
                true: theme.colors.primary,
                false: theme.texts.tertiaryLight,
              }}
            />
          </CheckBoxContainer>
        </Content>
      </Wrapper>
    </Container>
  );

  /* <BottomMenu
  visible={optionsVisible}
  onClose={() => setOptionsVisible(false)}
  onEditPressed={() => setEditModalVisible(true)}
  onDeletePressed={handleDelete}
/>

<EditItem
  shoppingListId={item.shopping_list_id}
  item={item}
  visible={editModalVisible}
  onClose={() => setEditModalVisible(false)}
/> */
};

const enhance = withObservables(['item'], ({ item }: CategoryItemProps) => ({
  item,
}));

export default memo(enhance(CategoryItem));
