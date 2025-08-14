import { CurrencyInfo } from '../features/currencies/types';

export const cryptoCurrencies: CurrencyInfo[] = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', type: 'CRYPTO', isPurchasable: true },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', type: 'CRYPTO', isPurchasable: true },
  { id: 'XRP', name: 'XRP', symbol: 'XRP', type: 'CRYPTO', isPurchasable: true },
  { id: 'BCH', name: 'Bitcoin Cash', symbol: 'BCH', type: 'CRYPTO', isPurchasable: true },
  { id: 'LTC', name: 'Litecoin', symbol: 'LTC', type: 'CRYPTO', isPurchasable: true },
  { id: 'EOS', name: 'EOS', symbol: 'EOS', type: 'CRYPTO', isPurchasable: true },
  { id: 'BNB', name: 'Binance Coin', symbol: 'BNB', type: 'CRYPTO', isPurchasable: true },
  { id: 'LINK', name: 'Chainlink', symbol: 'LINK', type: 'CRYPTO', isPurchasable: true },
  { id: 'NEO', name: 'NEO', symbol: 'NEO', type: 'CRYPTO', isPurchasable: true },
  { id: 'ETC', name: 'Ethereum Classic', symbol: 'ETC', type: 'CRYPTO', isPurchasable: true },
  { id: 'ONT', name: 'Ontology', symbol: 'ONT', type: 'CRYPTO', isPurchasable: true },
  { id: 'CRO', name: 'Crypto.com Chain', symbol: 'CRO', type: 'CRYPTO', isPurchasable: true },
  { id: 'CUC', name: 'Cucumber', symbol: 'CUC', type: 'CRYPTO', isPurchasable: false },
  { id: 'USDC', name: 'USD Coin', symbol: 'USDC', type: 'CRYPTO', isPurchasable: true },
];

export const fiatCurrencies: CurrencyInfo[] = [
  { id: 'SGD', name: 'Singapore Dollar', symbol: '$', code: 'SGD', type: 'FIAT', isPurchasable: true },
  { id: 'EUR', name: 'Euro', symbol: '€', code: 'EUR', type: 'FIAT', isPurchasable: true },
  { id: 'GBP', name: 'British Pound', symbol: '£', code: 'GBP', type: 'FIAT', isPurchasable: true },
  { id: 'HKD', name: 'Hong Kong Dollar', symbol: '$', code: 'HKD', type: 'FIAT', isPurchasable: true },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥', code: 'JPY', type: 'FIAT', isPurchasable: true },
  { id: 'AUD', name: 'Australian Dollar', symbol: '$', code: 'AUD', type: 'FIAT', isPurchasable: true },
  { id: 'USD', name: 'United States Dollar', symbol: '$', code: 'USD', type: 'FIAT', isPurchasable: true },
];
