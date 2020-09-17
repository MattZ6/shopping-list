import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Modal,
  Animated,
  useWindowDimensions,
  PanResponder,
} from 'react-native';

import {
  Container,
  BackdropButton,
  Backdrop,
  Sheet,
  SheetHeader,
  SheetHeaderDragabble,
} from './styles';

export interface BottomSheetHandles {
  close: () => void;
}

interface BottomSheetProps {
  isVisible?: boolean;
  onClose?: () => void;
  children: JSX.Element;
}

const BottomSheet: React.ForwardRefRenderFunction<
  BottomSheetHandles,
  BottomSheetProps
> = ({ isVisible, onClose, children }, ref) => {
  const { height } = useWindowDimensions();

  const panY = useRef(new Animated.Value(height)).current;

  const opacity = panY.interpolate({
    inputRange: [0, height],
    outputRange: [1, 0],
  });

  const scaleX = panY.interpolate({
    inputRange: [-0, height],
    outputRange: [1, 0.2],
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

  const close = useCallback(() => {
    closeAnimation.start(() => {
      panY.setValue(height);

      if (onClose) {
        onClose();
      }
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
          close();

          return;
        }

        openAnimation.start(() => {
          panY.setValue(0);
        });
      },
    }),
  ).current;

  useImperativeHandle(ref, () => ({
    close,
  }));

  useEffect(() => {
    if (isVisible) {
      openAnimation.start();
    }
  }, [isVisible, openAnimation]);

  return (
    <Container>
      <Modal
        transparent
        presentationStyle="overFullScreen"
        statusBarTranslucent
        visible={isVisible}
        onRequestClose={close}
        hardwareAccelerated
      >
        <BackdropButton onPress={close}>
          <Backdrop style={{ opacity }} />
        </BackdropButton>

        <Sheet style={{ transform: [{ translateY }] }}>
          <SheetHeader {...panResponder.panHandlers}>
            <SheetHeaderDragabble style={{ transform: [{ scaleX }] }} />
          </SheetHeader>
          {children}
        </Sheet>
      </Modal>
    </Container>
  );
};

export default React.memo(forwardRef(BottomSheet));
