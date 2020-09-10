import React, { useMemo, useState } from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import { useTheme } from 'styled-components/native';

import IconButton from '../../components/IconButton';
import BottomSheet from '../../components/BottomSheet';
import NewItem from '../../components/NewItem';

import Header from './components/Header';
import ListHeader from './components/ListHeader';
import ItemList from './components/ItemList';

import { Container, FabContainer } from './styles';

interface ListItem {
  key: string;
  render: () => JSX.Element;
  isHeader?: boolean;
}

const Home: React.FC = () => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const { data, indices } = useMemo(() => {
    const items: ListItem[] = [
      {
        key: 'PAGE_HEADER',
        render: () => <View />,
      },
      {
        key: 'CLEANUP_HEADER',
        render: () => (
          <ListHeader title="Banheiro" total={4} totalChecked={4} />
        ),
        isHeader: true,
      },
      {
        key: 'C1',
        render: () => (
          <ItemList
            items={[
              {
                id: 'pasta',
                title: '6 pastas de dentes',
                isChecked: false,
              },
              {
                id: 'escovas',
                title: '2 escovas de dentes',
                isChecked: false,
              },
              {
                id: 'h9dxq82',
                title: 'Shampoo Nanda',
                isChecked: false,
              },
              {
                id: 'ad12f',
                title: 'Shampoo Mat',
                isChecked: false,
              },
            ]}
          />
        ),
      },
      {
        key: 'COZINHA_HEADER',
        render: () => <ListHeader title="Cozinha" total={8} totalChecked={0} />,
        isHeader: true,
      },
      {
        key: 'C2',
        render: () => (
          <ItemList
            items={[
              {
                id: '12easd',
                title: '1kg de carne de frango',
                isChecked: false,
              },

              {
                id: 'a92819eun9',
                title: '1pc de arroz',
                isChecked: false,
              },
              {
                id: 'a01mf81',
                title: 'Um nome grande demais para ser exibido numa só linha',
                isChecked: false,
              },
              {
                id: 'ahg21f',
                title: 'dois tomates',
                isChecked: false,
              },
              {
                id: '8aqnd81',
                title: '1kg de banana',
                isChecked: false,
              },
              {
                id: 'ja8gn17',
                title: 'Café',
                isChecked: false,
              },
              {
                id: 'amznvu',
                title: 'Filtro de café',
                isChecked: false,
              },
              {
                id: 'qwegazxc',
                title: 'Açúcar',
                isChecked: false,
              },
              {
                id: 'batata',
                title: 'Batata',
                isChecked: false,
              },
              {
                id: 'paes',
                title: 'Pacote de pães',
                isChecked: false,
              },
            ]}
          />
        ),
      },
      {
        key: 'askd9das',
        render: () => (
          <ListHeader title="Maquiagem" total={8} totalChecked={0} />
        ),
        isHeader: true,
      },
      {
        key: 'C3',
        render: () => (
          <ItemList
            items={[
              {
                id: '12easd',
                title: '1kg de carne de frango',
                isChecked: false,
              },

              {
                id: 'a92819eun9',
                title: '1pc de arroz',
                isChecked: false,
              },
              {
                id: 'a01mf81',
                title: 'Um nome grande demais para ser exibido numa só linha',
                isChecked: false,
              },
              {
                id: 'ahg21f',
                title: 'dois tomates',
                isChecked: false,
              },
              {
                id: '8aqnd81',
                title: '1kg de banana',
                isChecked: false,
              },
              {
                id: 'ja8gn17',
                title: 'Café',
                isChecked: false,
              },
              {
                id: 'amznvu',
                title: 'Filtro de café',
                isChecked: false,
              },
              {
                id: 'qwegazxc',
                title: 'Açúcar',
                isChecked: false,
              },
              {
                id: 'batata',
                title: 'Batata',
                isChecked: false,
              },
              {
                id: 'paes',
                title: 'Pacote de pães',
                isChecked: false,
              },
            ]}
          />
        ),
      },
    ];

    const stickyIndices: number[] = [];

    items.forEach((item, index) => item.isHeader && stickyIndices.push(index));

    return {
      data: items,
      indices: stickyIndices,
    };
  }, []);

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Header />

      <FlatList<ListItem>
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 64,
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={indices}
      />

      <FabContainer>
        <IconButton
          icon="add"
          withElevation
          backgroundColor={theme.colors.success}
          onPress={() => setIsOpen(true)}
        />
      </FabContainer>

      <BottomSheet isVisible={isOpen} onClose={() => setIsOpen(false)}>
        <NewItem />
      </BottomSheet>
    </Container>
  );
};

export default Home;
