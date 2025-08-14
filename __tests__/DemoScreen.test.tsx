import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import { AnyAction } from 'redux';

import thunk from 'redux-thunk'; 
import { clearDbThunk, insertSeedsThunk } from '../src/features/currencies/currenciesSlice';
import { cryptoCurrencies, fiatCurrencies } from '../src/data/seeds';
import DemoScreen from '../src/ui/screens/DemoScreen';

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

jest.mock('../../features/currencies/currenciesSlice');

describe('<DemoScreen /> buttons', () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({ currencies: { items: [], mode: 'A_CRYPTO', loading: false } });
  });

  it('dispatches insertSeedsThunk when clicking Insert Data', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DemoScreen />
      </Provider>
    );

    fireEvent.press(getByText('2) Insert Data'));
    expect(insertSeedsThunk).toHaveBeenCalled();
  });

  it('dispatches clearDbThunk when clicking Clear DB', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DemoScreen />
      </Provider>
    );

    fireEvent.press(getByText('1) Clear DB'));
    expect(clearDbThunk).toHaveBeenCalled();
  });
});
