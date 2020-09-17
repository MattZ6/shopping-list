import React, { useCallback, memo, useState } from 'react';
import { TouchableNativeFeedback, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import withObservables from '@nozbe/with-observables';

import Item from '../../../../../../../../models/Item';

import EditItem from '../../../../../SaveItem';

import BottomMenu from './components/BottomMenu';

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
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  hideBorder = false,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const theme = useTheme();

  const handleToggleCheck = useCallback(async () => {
    await item.toggleCheck();
  }, [item]);

  const handleLongPress = useCallback(() => {
    setOptionsVisible(true);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await item.delete();
    } catch (error) {
      Alert.alert(
        'Ops, algo deu errado',
        'Não foi possível deletar o item. Por favor, tente novamente',
        [
          {
            style: 'default',
            text: 'Entendi',
          },
        ],
      );
    }
  }, [item]);

  return (
    <>
      <Container
        delayPressIn={60}
        background={TouchableNativeFeedback.Ripple(
          theme.ripples.primary,
          false,
        )}
        onPress={handleToggleCheck}
        onLongPress={handleLongPress}
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
                  false: theme.texts.tertiary,
                }}
              />
            </CheckBoxContainer>
          </Content>
        </Wrapper>
      </Container>

      <BottomMenu
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        onEditPressed={() => setEditModalVisible(true)}
        onDeletePressed={handleDelete}
      />

      <EditItem
        editItem={item}
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
    </>
  );
};

const enhance = withObservables(['item'], ({ item }: CategoryItemProps) => ({
  item,
}));

export default memo(enhance(CategoryItem));
