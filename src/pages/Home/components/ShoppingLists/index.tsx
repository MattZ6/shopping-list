import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ShoppingList from './components/ShoppingList';

import {
  Container,
  Header,
  Title,
  Description,
  List,
  Fab,
  FabButton,
  FabButtonContent,
  FabTitle,
} from './styles';

export interface IShoppingList {
  id: string;
  title: string;
}

const lists: IShoppingList[] = [
  {
    id: '1',
    title: 'Compras do mês',
  },
  {
    id: '2',
    title: 'Aniversário da baby',
  },
  {
    id: '3',
    title: 'Minha nova lista de compras',
  },
  {
    id: '4',
    title:
      'Uma lista de compras com o nome um pouco grande demais pra ver como fica no layout',
  },
  {
    id: '5',
    title: 'Aniversário do meu amô ❤',
  },
  {
    id: '6',
    title: 'Festa junina',
  },
  {
    id: '7',
    title: 'Muitos chocolates',
  },
];

const ShoppingLists: React.FC = () => {
  return (
    <>
      <Container>
        <Header>
          <Title>Minhas listas</Title>
          <Description>
            Você pode clicar numa lista para ver seus itens
          </Description>
        </Header>

        <List
          data={lists}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ShoppingList
              title={item.title}
              hideBorder={index === lists.length - 1}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Container>

      <Fab
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 4,
        }}
      >
        <FabButton delayPressIn={60}>
          <FabButtonContent>
            <Icon name="add" color="#fff" size={24} />

            <FabTitle numberOfLines={1}>Nova lista</FabTitle>
          </FabButtonContent>
        </FabButton>
      </Fab>
    </>
  );
};

export default memo(ShoppingLists);
