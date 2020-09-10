import React, { memo } from 'react';
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useTheme } from 'styled-components/native';

import { Container, Touchable, Content, Title } from './styles';

export interface ButtonOutlineProps extends TouchableNativeFeedbackProps {
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({
  children,
  containerStyle = {},
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Container style={containerStyle}>
      <Touchable
        delayPressIn={50}
        background={TouchableNativeFeedback.Ripple(
          theme.ripples.primary,
          false,
        )}
        {...rest}
      >
        <Content>
          <Title disabled={!!rest.disabled} numberOfLines={1}>
            {children}
          </Title>
        </Content>
      </Touchable>
    </Container>
  );
};

export default memo(ButtonOutline);
