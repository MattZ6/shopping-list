import { Item } from '../../../atoms/items';

export enum CartActionActionTypes {
  addItem = 'items/ADD',
  toggleItem = 'items/TOGGLE',
}

export interface IItemsState {
  items: Item[];
}
