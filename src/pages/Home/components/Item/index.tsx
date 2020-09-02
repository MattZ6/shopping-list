import React, { useState, useCallback, memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';

import { Container, ContenContent, Title, CheckboxContent } from './styles';

import { IITem } from './types';

interface ItemProps {
  item: IITem;
}

const Item: React.FC<ItemProps> = ({ item }) => {
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
      <ContenContent>
        <Title numberOfLines={1}>{item.title}</Title>

        <CheckboxContent>
          <CheckBox
            disabled
            value={isChecked}
            onValueChange={toggleCheck}
            tintColors={{
              true: theme.colors.primary,
              false: theme.texts.tertiary,
            }}
          />
        </CheckboxContent>
      </ContenContent>
    </Container>
  );
};

export default memo(Item);
