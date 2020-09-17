import { Model } from '@nozbe/watermelondb';
import { field, action } from '@nozbe/watermelondb/decorators';

export const ITEMS_TABLE_NAME = 'items';

export default class Item extends Model {
  static table = ITEMS_TABLE_NAME;

  @field('title')
  public title!: string;

  @field('category')
  public category!: string;

  @field('is_checked')
  public is_checked!: boolean;

  @action async delete(): Promise<void> {
    await super.destroyPermanently();
  }

  @action async toggleCheck(): Promise<void> {
    await this.update(item => {
      Object.assign(item, { is_checked: !item.is_checked } as Item);
    });
  }
}
