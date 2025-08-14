import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyInfo } from './types';
import { clearAll, insertMany, getByType, getPurchasables } from '../../db/currencyDao';
import { cryptoCurrencies, fiatCurrencies } from '../../data/seeds';

type Mode = 'A_CRYPTO' | 'B_FIAT' | 'PURCHASABLES';

interface CurrenciesState {
  mode: Mode;
  items: CurrencyInfo[];
  loading: boolean;
  error?: string;
}

const initialState: CurrenciesState = {
  mode: 'A_CRYPTO',
  items: [],
  loading: false,
};

// --- Thunks ---

export const clearDbThunk = createAsyncThunk('currencies/clearDb', async () => {
  await clearAll();
});

export const insertSeedsThunk = createAsyncThunk(
  'currencies/insertSeeds',
  async (_, { rejectWithValue }) => {
    try {
      const allItems = [...cryptoCurrencies, ...fiatCurrencies];
      console.log(`Seeding database with ${allItems.length} currencies...`);
      await insertMany(allItems);
      console.log('Database seeding completed.');
      return allItems.length; // optional: return count
    } catch (err) {
      console.error('Seeding failed:', err);
      return rejectWithValue(err);
    }
  }
);

export const loadAThunk = createAsyncThunk('currencies/loadA', async () => {
  return await getByType('CRYPTO');
});

export const loadBThunk = createAsyncThunk('currencies/loadB', async () => {
  return await getByType('FIAT');
});

export const loadPurchasablesThunk = createAsyncThunk('currencies/loadPurch', async () => {
  return await getPurchasables();
});

// --- Slice ---

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    setItems(state, action: PayloadAction<CurrencyInfo[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    const pending = (state: CurrenciesState) => {
      state.loading = true;
      state.error = undefined;
    };
    const rejected = (state: CurrenciesState, a: any) => {
      state.loading = false;
      state.error = a.error?.message ?? 'Error';
    };

    // Clear DB
    builder.addCase(clearDbThunk.pending, pending);
    builder.addCase(clearDbThunk.fulfilled, s => {
      s.loading = false;
      s.items = [];
    });
    builder.addCase(clearDbThunk.rejected, rejected);

    // Insert seeds
    builder.addCase(insertSeedsThunk.pending, pending);
    builder.addCase(insertSeedsThunk.fulfilled, s => {
      s.loading = false;
    });
    builder.addCase(insertSeedsThunk.rejected, rejected);

    // Load Crypto
    builder.addCase(loadAThunk.pending, pending);
    builder.addCase(loadAThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
      s.mode = 'A_CRYPTO';
    });
    builder.addCase(loadAThunk.rejected, rejected);

    // Load Fiat
    builder.addCase(loadBThunk.pending, pending);
    builder.addCase(loadBThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
      s.mode = 'B_FIAT';
    });
    builder.addCase(loadBThunk.rejected, rejected);

    // Load Purchasables
    builder.addCase(loadPurchasablesThunk.pending, pending);
    builder.addCase(loadPurchasablesThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
      s.mode = 'PURCHASABLES';
    });
    builder.addCase(loadPurchasablesThunk.rejected, rejected);
  },
});

export const { setMode, setItems } = currenciesSlice.actions;
export default currenciesSlice.reducer;
