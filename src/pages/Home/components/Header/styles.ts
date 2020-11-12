import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const HOME_HEADER_HEIGHT = 200;

export const Container = styled(Animated.View)`
  align-items: center;
  justify-content: center;

  padding: 16px 16px 32px;
  height: ${HOME_HEADER_HEIGHT}px;
`;

export const Title = styled.Text`
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SearchButtonWrapper = styled.View`
  overflow: hidden;

  margin-top: 32px;
  border-radius: 40px;
`;

export const SearchButton = styled.TouchableNativeFeedback``;

export const SearchButtonContent = styled.View`
  flex-direction: row;
  align-items: center;

  height: 40px;
  padding: 0 24px;
  border-radius: 40px;
  background: ${({ theme }) => theme.backgrounds.whiteWithOpacity};
`;

export const SearchButtonTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-left: 8px;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
