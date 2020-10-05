import React, { useCallback, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { Container } from './styles';

interface ScrollData {
  key: string;
  render: () => JSX.Element;
}

interface List {
  key: string;
  render: () => JSX.Element;
}

const lists: List[] = [
  {
    key: 'list-1',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-7',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-2',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-3',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-8',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-4',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-9',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-19',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha lista</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
  {
    key: 'list-94',
    render: () => (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Minha 123</Text>
        <Text style={{ fontSize: 15, color: '#999' }}>16 itens</Text>
      </View>
    ),
  },
];

const items: ScrollData[] = [
  {
    key: 'header',
    render: () => (
      <View
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: '#FFF',
          flex: 1,
          zIndex: 10,
        }}
      >
        <Text
          style={{ fontSize: 24, paddingVertical: 24, paddingHorizontal: 16 }}
        >
          Minhas listas
        </Text>
      </View>
    ),
  },
  {
    key: 'conteudo',
    render: () => (
      <FlatList
        data={lists}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        style={{ flex: 1, backgroundColor: '#fff', zIndex: 10 }}
      />
    ),
  },
];

const AnimationTest: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.setValue(event.nativeEvent.contentOffset.y);
    },
    [scrollY],
  );

  const headerHeigth = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [300, 120],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <View style={{ height: 100 }} />

      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          },
        ]}
      >
        <Text
          style={{
            color: '#fff',
            marginTop: 24,
            fontSize: 32,
            lineHeight: 48,
            textAlign: 'center',
          }}
        >
          Batata doce asidh asd as
        </Text>
      </Animated.View>

      <FlatList
        scrollEventThrottle={16}
        data={items}
        keyExtractor={item => item.key}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => item.render()}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ paddingTop: 200 }}
        onScroll={handleScroll}
      />
    </Container>
  );
};

export default AnimationTest;
