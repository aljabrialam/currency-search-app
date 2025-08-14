import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let dbInstance: SQLiteDatabase | null = null;

export const getDb = async (): Promise<SQLiteDatabase> => {
  if (dbInstance) return dbInstance;

  dbInstance = await SQLite.openDatabase({
    name: 'currencies.db',
    location: 'default',
  });

  console.log('Database opened');

  return dbInstance;
};

// Initialize table
export const initDb = async () => {
  const db = await getDb();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS currencies (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT,
      symbol TEXT,
      code TEXT,
      type TEXT,
      is_purchasable INTEGER
    );
  `);
  console.log('Table currencies ensured');
};
