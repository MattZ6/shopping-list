import { Model } from '@nozbe/watermelondb';
import { field, action, relation, text } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';

import ShoppingList, { SHOPPING_LISTS_TABLE_NAME } from './ShoppingList';

export const ITEMS_TABLE_NAME = 'items';

export default class Item extends Model {
  static table = ITEMS_TABLE_NAME;

  static associations: Associations = {
    shopping_lists: { type: 'belongs_to', key: 'shopping_list_id' },
  };

  @text('title')
  public title!: string;

  @field('category')
  public category!: string;

  @field('is_checked')
  public is_checked!: boolean;

  @relation(SHOPPING_LISTS_TABLE_NAME, 'shopping_list_id')
  public shopping_list!: ShoppingList;

  @field('shopping_list_id')
  public shopping_list_id!: string;

  @action async delete(): Promise<void> {
    await super.destroyPermanently();
  }

  @action async toggleCheck(): Promise<void> {
    await this.update(item => {
      Object.assign(item, { is_checked: !item.is_checked } as Item);
    });
  }
}
