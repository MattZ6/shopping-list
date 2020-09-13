import { Reducer } from 'redux';

import { IItemsState, CartActionActionTypes } from './types';
import { Item } from '../../../atoms/items';

const INITIAL_STATE: IItemsState = {
  items: [
    {
      key: '12321312',
      title: 'Batata doce',
      category: 'Cozinha',
    },
    {
      key: 'ja8dh917a9sd',
      title: 'Cachorro quente',
      category: 'Cozinha',
    },
  ],
};

const cart: Reducer<IItemsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionActionTypes.addItem: {
      const { item } = action.payload;

      return {
        ...state,
        items: [...state.items, new Item(item.title, item.category)],
      };
    }

    case CartActionActionTypes.toggleItem: {
      const { key } = action.payload;

      return {
        ...state,
        items: state.items.map(item =>
          item.key === key ? { ...item, selected: !item.selected } : item,
        ),
      };
    }

    default:
      return state;
  }
};

export default cart;
