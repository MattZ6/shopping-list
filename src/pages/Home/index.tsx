import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconButton from '../../components/IconButton';

import ShoppingLists from './components/ShoppingLists';

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
  return (
    <Container>
      <Toolbar>
        <ToolbarContent>
          <IconButton icon="more-vert" iconColor="#fff" />
        </ToolbarContent>
      </Toolbar>

      <SubHeader>
        <Title>Bora fazer umas listas{'\n'}de compras?</Title>

        <SearchButtonWrapper>
          <SearchButton delayPressIn={50}>
            <SearchButtonContent>
              <Icon size={24} name="search" color="#fff" />
              <SearchButtonTitle>Buscar uma lista</SearchButtonTitle>
            </SearchButtonContent>
          </SearchButton>
        </SearchButtonWrapper>
      </SubHeader>

      <ShoppingLists />
    </Container>
  );
};

export default Home;
