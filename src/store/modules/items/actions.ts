import { CartActionActionTypes } from './types';

export function addItem({ title, category }: any): any {
  return {
    type: CartActionActionTypes.addItem,
    payload: {
      item: {
        title,
        category,
      },
    },
  };
}

export function toggleItem(key: string): any {
  return {
    type: CartActionActionTypes.toggleItem,
    payload: {
      key,
    },
  };
}
