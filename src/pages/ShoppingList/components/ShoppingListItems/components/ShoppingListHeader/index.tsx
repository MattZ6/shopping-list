import React, { useMemo } from 'react';
import { Animated } from 'react-native';

import { Container, Title, Description } from './styles';

interface ShoppingListHeaderProps {
  title: string;
  description: string;
  scrollY: Animated.Value;
}

const ShoppingListHeader: React.FC<ShoppingListHeaderProps> = ({
  title,
  description,
  scrollY,
}) => {
  const { opacity, translateY } = useMemo(() => {
    return {
      translateY: scrollY.interpolate({
        inputRange: [60, 90],
        outputRange: [0, -2],
        extrapolate: 'clamp',
      }),
      opacity: scrollY.interpolate({
        inputRange: [60, 90],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    };
  }, [scrollY]);

  return (
    <Container>
      <Title
        numberOfLines={2}
        style={{
          opacity,
          transform: [{ translateY }],
        }}
      >
        {title}
      </Title>
      <Description
        numberOfLines={1}
        style={{
          opacity,
          transform: [{ translateY }],
        }}
      >
        {description}
      </Description>
    </Container>
  );
};

export default ShoppingListHeader;
