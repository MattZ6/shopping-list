import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../models/schema';
import models from '../models';

const adapter = new SQLiteAdapter({
  dbName: 'APP_SHOPPING_LIST',
  schema,
});

const database = new Database({
  adapter,
  modelClasses: models,
  actionsEnabled: true,
});

export default database;
