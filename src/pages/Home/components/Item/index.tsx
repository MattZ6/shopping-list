import React, { useState, useCallback, memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';

import {
  Container,
  Wrapper,
  Content,
  Title,
  CheckBoxContainer,
} from './styles';

import { IITem } from './types';

interface ItemProps {
  item: IITem;
  hideBorder?: boolean;
}

const Item: React.FC<ItemProps> = ({ item, hideBorder = false }) => {
  const [isChecked, setIsChecked] = useState(item.isChecked);

  const theme = useTheme();

  const toggleCheck = useCallback(() => {
    setIsChecked(state => !state);
  }, []);

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
              value={isChecked}
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

export default memo(Item);
