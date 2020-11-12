import { Model, Q } from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { action, children, lazy, text } from '@nozbe/watermelondb/decorators';

import Item, { ITEMS_TABLE_NAME } from './Item';

export const SHOPPING_LISTS_TABLE_NAME = 'shopping_lists';

export default class ShoppingList extends Model {
  static table = SHOPPING_LISTS_TABLE_NAME;

  static associations: Associations = {
    items: { type: 'has_many', foreignKey: 'shopping_list_id' },
  };

  @text('title')
  public title!: string;

  @children(ITEMS_TABLE_NAME)
  items!: Item[];

  @lazy items_count = this.collections
    .get(ITEMS_TABLE_NAME)
    .query(Q.where('shopping_list_id', this.id))
    .observeCount();

  @action delete(): Promise<void> {
    return super.destroyPermanently();
  }
}
