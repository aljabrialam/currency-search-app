import { clearAll, insertMany, getByType, getPurchasables }  from '../src/db/currencyDao';
import { getDb } from '../src/db/db';
import { CurrencyInfo } from '../src/features/currencies/types';

// Mock the getDb module
jest.mock('./db', () => ({
  getDb: jest.fn(),
}));

const mockExecuteSql = jest.fn();
const mockTransaction = jest.fn((fn, errCb, successCb) => {
  fn({
    executeSql: mockExecuteSql,
  });
  if (successCb) successCb();
});

describe('currencyDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getDb as jest.Mock).mockResolvedValue({
      executeSql: mockExecuteSql,
      transaction: mockTransaction,
    });
  });

  test('clearAll should execute DELETE statement', async () => {
    await clearAll();
    expect(mockExecuteSql).toHaveBeenCalledWith(
      'DELETE FROM currencies;',
      []
    );
  });

  test('insertMany should skip when no valid items', async () => {
    await insertMany([{ id: '', name: '', symbol: '', type: 'FIAT', isPurchasable: false } as CurrencyInfo]);
    expect(mockTransaction).not.toHaveBeenCalled();
  });

  test('insertMany should insert valid currencies', async () => {
    const items: CurrencyInfo[] = [
      { id: '1', name: 'US Dollar', symbol: '$', code: 'USD', type: 'FIAT', isPurchasable: true },
      { id: '2', name: 'Bitcoin', symbol: '₿', code: 'BTC', type: 'CRYPTO', isPurchasable: false },
    ];
    await insertMany(items);
    expect(mockTransaction).toHaveBeenCalled();
    expect(mockExecuteSql).toHaveBeenCalledWith(
      expect.stringContaining('INSERT OR REPLACE INTO currencies'),
      ['1', 'US Dollar', '$', 'USD', 'FIAT', 1],
      expect.any(Function),
      expect.any(Function)
    );
  });

  test('getByType should return mapped results', async () => {
    mockExecuteSql.mockResolvedValueOnce([
      {
        rows: {
          length: 1,
          item: (i: number) => ({
            id: '1',
            name: 'US Dollar',
            symbol: '$',
            code: 'USD',
            type: 'FIAT',
            is_purchasable: 1,
          }),
        },
      },
    ]);

    const result = await getByType('FIAT');
    expect(result).toEqual([
      {
        id: '1',
        name: 'US Dollar',
        symbol: '$',
        code: 'USD',
        type: 'FIAT',
        isPurchasable: true,
      },
    ]);
  });

  test('getPurchasables should return mapped results', async () => {
    mockExecuteSql.mockResolvedValueOnce([
      {
        rows: {
          length: 1,
          item: (i: number) => ({
            id: '2',
            name: 'Bitcoin',
            symbol: '₿',
            code: 'BTC',
            type: 'CRYPTO',
            is_purchasable: 1,
          }),
        },
      },
    ]);

    const result = await getPurchasables();
    expect(result).toEqual([
      {
        id: '2',
        name: 'Bitcoin',
        symbol: '₿',
        code: 'BTC',
        type: 'CRYPTO',
        isPurchasable: true,
      },
    ]);
  });
});
