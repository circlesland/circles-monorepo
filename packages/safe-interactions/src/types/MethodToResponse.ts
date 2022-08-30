import { SafeMethod } from './SafeMethod';

import type {
  ChainInfo,
  GatewayTransactionDetails,
  SafeBalance,
  SafeInfo,
  SendTransactionsResponse,
} from './Response';
export interface MethodToResponse {
  [SafeMethod.sendTransactions]: SendTransactionsResponse;
  [SafeMethod.rpcCall]: unknown;
  [SafeMethod.getSafeInfo]: SafeInfo;
  [SafeMethod.getChainInfo]: ChainInfo;
  [SafeMethod.getTxBySafeTxHash]: GatewayTransactionDetails;
  [SafeMethod.getSafeBalances]: SafeBalance[];
  [SafeMethod.signMessage]: SendTransactionsResponse;
  // [SafeMethod.getEnvironmentInfo]: EnvironmentInfo;
  // [SafeMethod.requestAddressBook]: AddressBookItem[];
  // [SafeMethod.wallet_getPermissions]: Permission[];
  // [SafeMethod.wallet_requestPermissions]: Permission[];
}
