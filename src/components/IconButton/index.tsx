import React, { memo, useEffect, useState } from 'react';
import { TouchableNativeFeedbackProps, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import { Container, Button, ButtonContent } from './styles';

interface IconButtonProps extends TouchableNativeFeedbackProps {
  icon: string;
  backgroundColor?: string;
  size?: 'small' | 'default';
  withElevation?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  backgroundColor,
  size = 'default',
  withElevation = false,
  ...rest
}) => {
  const theme = useTheme();

  const [scale] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }, [scale]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale,
          },
        ],
      }}
    >
      <Container
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        size={size}
        backgroundColor={backgroundColor}
        style={
          withElevation
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
              }
            : {}
        }
      >
        <Button
          delayPressIn={0}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          {...rest}
        >
          <ButtonContent>
            <Icon name={icon} color={theme.texts.white} size={24} />
          </ButtonContent>
        </Button>
      </Container>
    </Animated.View>
  );
};

export default memo(IconButton);
