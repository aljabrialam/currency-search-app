import { getDb } from './db';
import { CurrencyInfo } from '../features/currencies/types';

const mapRow = (row: any): CurrencyInfo => ({
  id: row.id,
  name: row.name,
  symbol: row.symbol,
  code: row.code ?? undefined,
  type: row.type,
  isPurchasable: row.is_purchasable === 1,
});

export const clearAll = async () => {
  const db = await getDb();
  console.log('Clearing all currencies...');
  await db.executeSql('DELETE FROM currencies;');
  console.log('All currencies cleared.');
};

export const insertMany = async (items: CurrencyInfo[]) => {
  const db = await getDb();
  const validItems = items.filter(c => c.id && c.name && c.symbol);
  if (!validItems.length) {
    console.warn('No valid items to insert');
    return;
  }

  console.log(`Starting transaction to insert ${validItems.length} currencies...`);

  db.transaction(
    (    tx: { executeSql: (arg0: string, arg1: (string | number | null)[], arg2: () => void, arg3: (_: any, err: any) => void) => void; }) => {
      validItems.forEach(c => {
        tx.executeSql(
          `INSERT OR REPLACE INTO currencies (id, name, symbol, code, type, is_purchasable)
           VALUES (?, ?, ?, ?, ?, ?);`,
          [c.id, c.name, c.symbol, c.code ?? null, c.type, c.isPurchasable ? 1 : 0],
          () => console.log(`Inserted: ${c.name}`),
          (_: any, err: any) => console.error(`Insert error for ${c.name}:`, err)
        );
      });
    },
    (    err: any) => console.error('Transaction failed:', err),
    () => console.log('Transaction complete')
  );
};

export const getByType = async (type: 'CRYPTO' | 'FIAT'): Promise<CurrencyInfo[]> => {
  const db = await getDb();
  const res = await db.executeSql(
    'SELECT * FROM currencies WHERE type=? ORDER BY name COLLATE NOCASE;',
    [type]
  );
  const rows = res[0].rows;
  const out: CurrencyInfo[] = [];
  for (let i = 0; i < rows.length; i++) out.push(mapRow(rows.item(i)));
  return out;
};

export const getPurchasables = async (): Promise<CurrencyInfo[]> => {
  const db = await getDb();
  const res = await db.executeSql(
    'SELECT * FROM currencies WHERE is_purchasable=1 ORDER BY type, name COLLATE NOCASE;'
  );
  const rows = res[0].rows;
  const out: CurrencyInfo[] = [];
  for (let i = 0; i < rows.length; i++) out.push(mapRow(rows.item(i)));
  return out;
};
