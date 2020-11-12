import React, { useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import IconButton from '../../../../components/IconButton';

import {
  Container,
  StatusBarSpace,
  Content,
  ButtonsContainer,
  Title,
} from './styles';

interface ToolbarProps {
  title?: string;
  scrollY?: Animated.Value;
  invertedColors?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  scrollY,
  invertedColors,
}) => {
  const theme = useTheme();
  const navigator = useNavigation();

  const handleBack = useCallback(() => navigator.goBack(), [navigator]);

  const { translateY, opacity } = useMemo(() => {
    if (!scrollY) {
      return {
        translateY: 0,
        opacity: 1,
      };
    }

    return {
      translateY: scrollY.interpolate({
        inputRange: [85, 110],
        outputRange: [4, 0],
        extrapolate: 'clamp',
      }),
      opacity: scrollY.interpolate({
        inputRange: [85, 110],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };
  }, [scrollY]);

  return (
    <Container
      style={{
        backgroundColor: invertedColors
          ? theme.backgrounds.default
          : theme.colors.primary,
      }}
    >
      <StatusBarSpace />

      <Content>
        <ButtonsContainer>
          <IconButton
            icon="arrow-back"
            onPress={handleBack}
            iconColor={invertedColors ? theme.texts.tertiary : undefined}
          />
        </ButtonsContainer>

        {title && (
          <Title
            numberOfLines={1}
            style={[
              {
                color: invertedColors
                  ? theme.texts.tertiary
                  : theme.texts.white,
              },
              { opacity, transform: [{ translateY }] },
            ]}
          >
            {title}
          </Title>
        )}

        <ButtonsContainer>
          <IconButton
            icon="more-vert"
            iconColor={invertedColors ? theme.texts.tertiary : undefined}
          />
        </ButtonsContainer>
      </Content>
    </Container>
  );
};

export default Toolbar;
