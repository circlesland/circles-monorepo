import {
    BaseTransaction,
    getSDKVersion,
    MessageFormatter,
    Methods,
    MethodToResponse,
    RequestId,
    RPCPayload,
    SDKMessageEvent,
    SignMessageParams,
} from '@gnosis.pm/safe-apps-sdk';
import { providers } from 'ethers';

import { chainIdToNetwork } from './chainIdToNetwork';
import { sendTransaction, signMessage } from './SendTransactions';

interface Account {
  chainId: number;
  address: string;
}

type LegacyMethods = "getEnvInfo";
type SDKMethods = Methods | LegacyMethods;

export interface MessageHandlers {
  onTransactionProposal: (transactions: BaseTransaction[], requestId: RequestId) => void;
}

export class FrameCommunicator {
  private account: Account;
  private appUrl: string;
  private iframe: HTMLIFrameElement;
  constructor(account: Account, appUrl: string, iframe: HTMLIFrameElement) {
    this.account = account;
    this.appUrl = appUrl;
    this.iframe = iframe;
  }

  handleMessage(message: SDKMessageEvent) {
    const { method, params, id: requestId }: { method: SDKMethods; params: unknown; id: RequestId } = message.data;

    if (!method) {
      console.error("ThirdPartyApp: A message was received without message id.");
      return;
    }
    console.log(`Received ${method} with ${JSON.stringify(params)}`);

    switch (method as SDKMethods) {
      case "sendTransactions": {
        if (params) {
          console.log("do tx", method, params, requestId);
          // @ts-ignore
          const { txs } = params;
          sendTransaction(txs);
        }
        break;
      }

      case "signMessage": {
        const { message } = params as SignMessageParams;
        signMessage(message).then((signature) => {
          this.sendResponse(signature, requestId);
        });
        break;
      }

      case "getEnvInfo": {
        this.sendResponse({ txServiceUrl: "https://safe-transaction.xdai.gnosis.io/api/v1" }, requestId);
        break;
      }

      // @ts-ignore
      case "getPrivateKey": {
        // @ts-ignore
        const profileData = window.authApi.getDataFromLocalStorage();
        // @ts-ignore
        this.sendResponse(profileData, requestId);
        break;
      }

      case "getSafeInfo": {
        this.sendResponse(
          {
            safeAddress: "0xa6105f87497ad659b104bebb5a736956642588e7" || this.account.address,
            chainId: this.account.chainId,
            network: chainIdToNetwork[this.account.chainId],
          },
          requestId
        );
        break;
      }

      case "getChainInfo": {
        this.sendResponse(
          {
            chainName: "Gnosis Chain",
            chainId: "0x64",
            shortName: "Gnosis",
            nativeCurrency: "xDai",
            blockExplorerUriTemplate: "https://blockscout.com/xdai/mainnet",
          },
          requestId
        );
        break;
      }

      case "rpcCall": {
        const payload = params as RPCPayload;
        const provider = new providers.JsonRpcProvider("https://rpc.gnosischain.com");
        provider!!.send(payload.call, payload.params).then((resp: any) => {
          this.sendResponse(resp, requestId);
        });
        console.log("rpc call", payload);
        break;
      }

      default: {
        console.error(`ThirdPartyApp: A message was received with an unknown method ${method}.`);
        break;
      }
    }
  }

  onMessage(message: SDKMessageEvent) {
    if (message.source === window) {
      return;
    }
    if (!this.appUrl.includes(message.origin)) {
      console.error(`ThirdPartyApp: A message was received from an unknown origin ${message.origin}`);
      return;
    }
    this.handleMessage(message);
  }

  sendResponse(data: MethodToResponse[Methods], requestId: RequestId) {
    const frameWindow = this.iframe.contentWindow;
    if (!frameWindow) return;
    const sdkVersion = getSDKVersion();
    const msg = MessageFormatter.makeResponse(requestId, data, sdkVersion);
    frameWindow.postMessage(msg, this.appUrl);
  }
}
