import React, { memo, useMemo } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import {
  Container,
  Title,
  SearchButtonWrapper,
  SearchButton,
  SearchButtonContent,
  SearchButtonTitle,
} from './styles';

interface HeaderProps {
  scrollY: Animated.Value;
  onSearchButtonPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrollY, onSearchButtonPress }) => {
  const theme = useTheme();

  const { opacity, translateY } = useMemo(() => {
    return {
      opacity: scrollY.interpolate({
        inputRange: [20, 160],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),

      translateY: scrollY.interpolate({
        inputRange: [0, 130],
        outputRange: [0, 36],
        extrapolate: 'extend',
      }),
    };
  }, [scrollY]);

  return (
    <Container
      renderToHardwareTextureAndroid
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Title>Bora fazer umas listas{'\n'}de compras?</Title>

      <SearchButtonWrapper>
        <SearchButton delayPressIn={50} onPress={onSearchButtonPress}>
          <SearchButtonContent>
            <Icon size={24} name="search" color={theme.texts.white} />
            <SearchButtonTitle>Buscar uma lista</SearchButtonTitle>
          </SearchButtonContent>
        </SearchButton>
      </SearchButtonWrapper>
    </Container>
  );
};

export default memo(Header);
