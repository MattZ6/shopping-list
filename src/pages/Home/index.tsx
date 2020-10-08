import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import IconButton from '../../components/IconButton';

import ShoppingLists from './components/ShoppingLists';
import SaveListBottomSheet from './components/SaveListBottomSheet';

import {
  Container,
  Toolbar,
  ToolbarContent,
  SubHeader,
  Title,
  SearchButtonWrapper,
  SearchButton,
  SearchButtonContent,
  SearchButtonTitle,
} from './styles';

const Home: React.FC = () => {
  const [addListModalVisible, setAddListModalVisible] = useState(false);

  const theme = useTheme();

  const handleOpenAddListModal = useCallback(() => {
    setAddListModalVisible(true);
  }, []);

  const handleCloseAddListModal = useCallback(() => {
    setAddListModalVisible(false);
  }, []);

  return (
    <>
      <Container>
        <Toolbar>
          <ToolbarContent>
            <IconButton icon="more-vert" iconColor={theme.texts.white} />
          </ToolbarContent>
        </Toolbar>

        <SubHeader>
          <Title>Bora fazer umas listas{'\n'}de compras?</Title>

          <SearchButtonWrapper>
            <SearchButton delayPressIn={50}>
              <SearchButtonContent>
                <Icon size={24} name="search" color={theme.texts.white} />
                <SearchButtonTitle>Buscar uma lista</SearchButtonTitle>
              </SearchButtonContent>
            </SearchButton>
          </SearchButtonWrapper>
        </SubHeader>

        <ShoppingLists onAddPressed={handleOpenAddListModal} />
      </Container>

      <SaveListBottomSheet
        isVisible={addListModalVisible}
        onClose={handleCloseAddListModal}
      />
    </>
  );
};

export default Home;
