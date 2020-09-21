import React, { memo, useEffect, useMemo } from 'react';
import {
  TouchableNativeFeedbackProps,
  Animated,
  Insets,
  ViewStyle,
  StyleProp,
} from 'react-native';

import { Container, Button, ButtonContent, Icon } from './styles';

const hitSlop: Insets = { top: 10, right: 10, bottom: 10, left: 10 };

const styles: StyleProp<ViewStyle> = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 3,
};

interface FabProps extends TouchableNativeFeedbackProps {
  icon: string;
  backgroundColor?: string;
  size?: 'small' | 'default';
}

const Fab: React.FC<FabProps> = ({
  icon,
  backgroundColor,
  size = 'default',
  ...rest
}) => {
  const scale = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }, [scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Container size={size} backgroundColor={backgroundColor} style={styles}>
        <Button delayPressIn={0} hitSlop={hitSlop} {...rest}>
          <ButtonContent>
            <Icon name={icon} />
          </ButtonContent>
        </Button>
      </Container>
    </Animated.View>
  );
};

export default memo(Fab);
