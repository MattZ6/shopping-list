import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  position: relative;
  background: #529ced;
`;

export const Toolbar = styled.View`
  height: 80px;
`;

export const ToolbarContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  padding: 28px 8px 0;
`;

export const SubHeader = styled.View`
  align-items: center;
  justify-content: center;

  padding: 16px 16px 32px;
`;

export const Title = styled.Text`
  font-size: 28px;
  text-align: center;
  color: ${({ theme }) => theme.texts.white};
  font-family: ${({ theme }) => theme.fonts.semiBold};
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
  background: rgba(255, 255, 255, 0.4);
`;

export const SearchButtonTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export const FabContainer = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
