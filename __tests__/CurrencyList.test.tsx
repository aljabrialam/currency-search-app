import React from 'react';
import { render } from '@testing-library/react-native';
import { CurrencyInfo } from '../src/features/currencies/types';
import CurrencyList from '../src/ui/components/CurrencyList';

const items: CurrencyInfo[] = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', type: 'CRYPTO', isPurchasable: true },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', type: 'CRYPTO', isPurchasable: false },
];

describe('<CurrencyList />', () => {
  it('renders all items', () => {
    const { getByText } = render(<CurrencyList data={items} title='a' />);
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();
  });

  it('renders empty view when no items', () => {
    const { getByText } = render(<CurrencyList  data={[]} title='b' />);
    expect(getByText('No Data')).toBeTruthy();
  });
});
