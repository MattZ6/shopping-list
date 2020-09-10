import React, { memo, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Modal,
  View,
  Animated,
  useWindowDimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';

import { useTheme } from 'styled-components/native';

interface BottomSheetProps {
  isVisible?: boolean;
  onClose?: () => void;
  children: JSX.Element;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  const { height } = useWindowDimensions();

  const theme = useTheme();

  const panY = useRef(new Animated.Value(height)).current;
  const containerRef = useRef<View>(null);

  const opacity = panY.interpolate({
    inputRange: [0, height],
    outputRange: [1, 0],
  });

  const scaleX = panY.interpolate({
    inputRange: [-0, height],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const translateY = panY.interpolate({
    inputRange: [-0, height],
    outputRange: [0, height],
    extrapolate: 'clamp',
  });

  const openAnimation = useMemo(() => {
    return Animated.timing(panY, {
      useNativeDriver: true,
      toValue: 0,
      duration: 250,
    });
  }, [panY]);

  const closeAnimation = useMemo(() => {
    return Animated.timing(panY, {
      useNativeDriver: true,
      toValue: height,
      duration: 200,
    });
  }, [panY, height]);

  const handleClose = useCallback(() => {
    closeAnimation.start(() => {
      if (onClose) {
        onClose();
      }

      panY.setValue(height);
    });
  }, [onClose, panY, height, closeAnimation]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (_, { dy }) => panY.setValue(dy),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy === 0) {
          return;
        }

        if (gestureState.dy >= 125 || gestureState.vy >= 0.75) {
          handleClose();

          return;
        }

        openAnimation.start(() => {
          panY.setValue(0);
        });
      },
    }),
  ).current;

  useEffect(() => {
    if (isVisible) {
      openAnimation.start();
    }
  }, [isVisible, openAnimation, handleClose]);

  return (
    <View style={{ position: 'relative' }}>
      <Modal
        transparent
        presentationStyle="overFullScreen"
        statusBarTranslucent
        visible={isVisible}
        onRequestClose={handleClose}
        hardwareAccelerated
      >
        <TouchableWithoutFeedback onPress={handleClose} style={{ flex: 1 }}>
          <Animated.View
            style={[
              { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
              {
                opacity,
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          ref={containerRef}
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            },
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              paddingTop: 16,
              paddingBottom: 24,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}
            {...panResponder.panHandlers}
          >
            <Animated.View
              style={[
                {
                  width: '30%',
                  height: 4,
                  borderRadius: 8,
                  backgroundColor: theme.backgrounds.listHeader,
                },
                {
                  transform: [
                    {
                      scaleX,
                    },
                  ],
                },
              ]}
            />
          </View>
          {children}
        </Animated.View>
      </Modal>
    </View>
  );
};

export default memo(BottomSheet);
