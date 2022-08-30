import type { TokenInfo, TransactionDetails } from './Transaction';

export type SendTransactionsResponse = {
  safeTxHash: string;
};

export type SafeInfo = {
  safeAddress: string;
  chainId: number;
  threshold: number;
  owners: string[];
  isReadOnly: boolean;
};

export type ChainInfo =
  | 'chainName'
  | 'chainId'
  | 'shortName'
  | 'nativeCurrency'
  | 'blockExplorerUriTemplate';

export type GatewayTransactionDetails = TransactionDetails;

export type SafeBalance = {
  fiatTotal: string;
  items: Array<{
    tokenInfo: TokenInfo;
    balance: string;
    fiatBalance: string;
    fiatConversion: string;
  }>;
};
