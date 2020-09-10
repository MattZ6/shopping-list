import React, { memo } from 'react';
import {
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useTheme } from 'styled-components/native';

import { Container, Touchable, Content, Title } from './styles';

export interface ButtonProps extends TouchableNativeFeedbackProps {
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
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
        <Content disabled={!!rest.disabled}>
          <Title disabled={!!rest.disabled} numberOfLines={1}>
            {children}
          </Title>
        </Content>
      </Touchable>
    </Container>
  );
};

export default memo(Button);
