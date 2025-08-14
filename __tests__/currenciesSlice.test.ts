import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; 

import * as dao from '../src/db/currencyDao';
import { cryptoCurrencies, fiatCurrencies,  } from '../src/data/seeds';
import { clearDbThunk, insertSeedsThunk, loadAThunk, loadBThunk, loadPurchasablesThunk } from '../src/features/currencies/currenciesSlice';
// --- Define state type for the mock store ---
type RootState = {
  currencies: {
    items: typeof cryptoCurrencies | typeof fiatCurrencies | any[];
    mode: 'A_CRYPTO' | 'B_FIAT' | 'PURCHASABLES';
    loading: boolean;
    error?: string;
  };
};


// const middlewares = [thunk as any]; // cast to any
const mockStore = configureMockStore<RootState>([]);

// --- Mock DAO functions ---
jest.mock('../src/db/currencyDao');

describe('currenciesSlice thunks', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      currencies: { items: [], mode: 'A_CRYPTO', loading: false },
    });
  });

  it('insertSeedsThunk calls insertMany', async () => {
    (dao.insertMany as jest.Mock).mockResolvedValue(undefined);
    await store.dispatch(insertSeedsThunk() as any);
    expect(dao.insertMany).toHaveBeenCalledWith([...cryptoCurrencies, ...fiatCurrencies]);
  });

  it('clearDbThunk calls clearAll', async () => {
    (dao.clearAll as jest.Mock).mockResolvedValue(undefined);
    await store.dispatch(clearDbThunk() as any);
    expect(dao.clearAll).toHaveBeenCalled();
  });

  it('loadAThunk calls getByType CRYPTO', async () => {
    (dao.getByType as jest.Mock).mockResolvedValue(cryptoCurrencies);
    await store.dispatch(loadAThunk() as any);
    expect(dao.getByType).toHaveBeenCalledWith('CRYPTO');
  });

  it('loadBThunk calls getByType FIAT', async () => {
    (dao.getByType as jest.Mock).mockResolvedValue(fiatCurrencies);
    await store.dispatch(loadBThunk() as any);
    expect(dao.getByType).toHaveBeenCalledWith('FIAT');
  });

  it('loadPurchasablesThunk calls getPurchasables', async () => {
    (dao.getPurchasables as jest.Mock).mockResolvedValue([]);
    await store.dispatch(loadPurchasablesThunk() as any);
    expect(dao.getPurchasables).toHaveBeenCalled();
  });
});
