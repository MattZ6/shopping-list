import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';

import { IState } from '../../store';

import { Item } from '../../atoms/items';

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

  const items = useSelector<IState, Item[]>(state => state.items.items);
  // const { items } = useItems();

  const [isOpen, setIsOpen] = useState(false);

  const flatListData = useMemo(() => {
    const categories: string[] = [];

    items.forEach(
      item =>
        !categories.includes(item.category) && categories.push(item.category),
    );

    const renderItems: ListItem[] = [];

    categories.forEach(category => {
      const categoryItems = items.filter(item => item.category === category);

      const total = categoryItems.length;
      const totalChecked = categoryItems.filter(item => item.selected).length;

      const categoryKey = category.split(' ').join('_').toUpperCase();

      renderItems.push({
        key: categoryKey,
        isHeader: true,
        render: () => (
          <ListHeader
            title={category}
            total={total}
            totalChecked={totalChecked}
          />
        ),
      });

      renderItems.push({
        key: `${categoryKey}_ITEMS`,
        render: () => <ItemList items={categoryItems} />,
      });
    });

    const stickyIndices: number[] = [];

    renderItems.forEach(
      (item, index) => item.isHeader && stickyIndices.push(index),
    );

    return { items: renderItems, stickyIndices };
  }, [items]);

  // const { data, indices } = useMemo(() => {
  //   const xxx: ListItem[] = [
  //     {
  //       key: 'PAGE_HEADER',
  //       render: () => <View />,
  //     },
  //     {
  //       key: 'CLEANUP_HEADER',
  //       render: () => (
  //         <ListHeader title="Banheiro" total={4} totalChecked={4} />
  //       ),
  //       isHeader: true,
  //     },
  //     {
  //       key: 'C1',
  //       render: () => (
  //         <ItemList
  //           items={[
  //             {
  //               id: 'pasta',
  //               title: '6 pastas de dentes',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'escovas',
  //               title: '2 escovas de dentes',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'h9dxq82',
  //               title: 'Shampoo Nanda',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'ad12f',
  //               title: 'Shampoo Mat',
  //               isChecked: false,
  //             },
  //           ]}
  //         />
  //       ),
  //     },
  //     {
  //       key: 'COZINHA_HEADER',
  //       render: () => <ListHeader title="Cozinha" total={8} totalChecked={0} />,
  //       isHeader: true,
  //     },
  //     {
  //       key: 'C2',
  //       render: () => (
  //         <ItemList
  //           items={[
  //             {
  //               id: '12easd',
  //               title: '1kg de carne de frango',
  //               isChecked: false,
  //             },

  //             {
  //               id: 'a92819eun9',
  //               title: '1pc de arroz',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'a01mf81',
  //               title: 'Um nome grande demais para ser exibido numa só linha',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'ahg21f',
  //               title: 'dois tomates',
  //               isChecked: false,
  //             },
  //             {
  //               id: '8aqnd81',
  //               title: '1kg de banana',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'ja8gn17',
  //               title: 'Café',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'amznvu',
  //               title: 'Filtro de café',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'qwegazxc',
  //               title: 'Açúcar',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'batata',
  //               title: 'Batata',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'paes',
  //               title: 'Pacote de pães',
  //               isChecked: false,
  //             },
  //           ]}
  //         />
  //       ),
  //     },
  //     {
  //       key: 'askd9das',
  //       render: () => (
  //         <ListHeader title="Maquiagem" total={8} totalChecked={0} />
  //       ),
  //       isHeader: true,
  //     },
  //     {
  //       key: 'C3',
  //       render: () => (
  //         <ItemList
  //           items={[
  //             {
  //               id: '12easd',
  //               title: '1kg de carne de frango',
  //               isChecked: false,
  //             },

  //             {
  //               id: 'a92819eun9',
  //               title: '1pc de arroz',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'a01mf81',
  //               title: 'Um nome grande demais para ser exibido numa só linha',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'ahg21f',
  //               title: 'dois tomates',
  //               isChecked: false,
  //             },
  //             {
  //               id: '8aqnd81',
  //               title: '1kg de banana',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'ja8gn17',
  //               title: 'Café',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'amznvu',
  //               title: 'Filtro de café',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'qwegazxc',
  //               title: 'Açúcar',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'batata',
  //               title: 'Batata',
  //               isChecked: false,
  //             },
  //             {
  //               id: 'paes',
  //               title: 'Pacote de pães',
  //               isChecked: false,
  //             },
  //           ]}
  //         />
  //       ),
  //     },
  //   ];

  //   const stickyIndices: number[] = [];

  //   xxx.forEach((item, index) => item.isHeader && stickyIndices.push(index));

  //   return {
  //     data: xxx,
  //     indices: stickyIndices,
  //   };
  // }, []);

  return (
    <Container>
      <Header />

      <FlatList<ListItem>
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 64,
        }}
        showsVerticalScrollIndicator={false}
        data={flatListData.items}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={flatListData.stickyIndices}
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
