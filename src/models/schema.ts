import { appSchema, tableSchema } from '@nozbe/watermelondb';

import { ITEMS_TABLE_NAME } from './Item';
import { SHOPPING_LISTS_TABLE_NAME } from './ShoppingList';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: ITEMS_TABLE_NAME,
      columns: [
        { name: 'title', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'is_checked', type: 'boolean' },
        { name: 'shopping_list_id', type: 'string', isIndexed: true },
      ],
    }),
    tableSchema({
      name: SHOPPING_LISTS_TABLE_NAME,
      columns: [{ name: 'title', type: 'string' }],
    }),
  ],
});
