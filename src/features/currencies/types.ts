export type CurrencyType = 'CRYPTO' | 'FIAT';

export interface CurrencyInfo {
  id: string; // e.g., BTC or SGD
  name: string; // e.g., Bitcoin or Singapore Dollar
  symbol: string; // e.g., BTC or $/€
  code?: string; // for fiats (e.g., "SGD")
  type: CurrencyType;
  isPurchasable: boolean;
}
