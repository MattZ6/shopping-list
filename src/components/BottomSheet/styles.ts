import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
`;

export const BackdropButton = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const Backdrop = styled(Animated.View)`
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
`;

export const Sheet = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const SheetHeader = styled.View`
  background: transparent;
  padding: 16px 0 24px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const SheetHeaderDragabble = styled(Animated.View)`
  width: 30%;
  height: 4px;
  border-radius: 8px;
  background: ${({ theme }) => theme.backgrounds.listHeader};
`;
