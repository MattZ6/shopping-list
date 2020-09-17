import React, { memo, useEffect, useMemo } from 'react';
import { Animated } from 'react-native';

import { Container, IconWrapper, Icon, Title, Description } from './styles';

interface ScreenStateProps {
  icon: string;
  title: string;
  description: string;
}

const ScreenState: React.FC<ScreenStateProps> = ({
  icon,
  title,
  description,
}) => {
  const translateY = useMemo(() => new Animated.Value(24), []);
  const opacity = translateY.interpolate({
    inputRange: [0, 16],
    outputRange: [1, 0],
  });

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, [translateY]);

  return (
    <Container
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <IconWrapper>
        <Icon name={icon} />
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

export default memo(ScreenState);
