import Safe from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { ethers, Wallet } from 'ethers';

export const createSafe = async () => {
  const michaelsSafeInfo = {
    privateKey: "0x99461b64b5573db34d0b22e0c94b50a9fde1a9fe71a5dd1be9b4a24ac8fa39da",
    safeAddress: "0x40e8d854feb495ea441bcac469a14d2bd02eeb5a",
  };

  const testProvider = new ethers.providers.JsonRpcProvider({
    url: "https://rpc.gnosischain.com",
  });
  const michaelsSigner = new Wallet(michaelsSafeInfo.privateKey, testProvider);
  const michaelsEthAdapter = new EthersAdapter({
    ethers,
    signer: michaelsSigner,
  });

  const id = await michaelsEthAdapter.getChainId();

  const michaelsSafeSdk = await Safe.create({
    ethAdapter: michaelsEthAdapter,
    safeAddress: michaelsSafeInfo.safeAddress,
  });

  return michaelsSafeSdk;
};

export const makeTransaction = async () => {
  const safeSdk = await createSafe();

  const transactions = [
    {
      to: "0x......", // Destination address goes here
      data: "0x",
      value: "10000000000000000",
    },
  ];

  const options = {};

  const transaction = await safeSdk.createTransaction(transactions, options);
  await safeSdk.signTransaction(transaction);

  const executeTxResponse = await safeSdk.executeTransaction(transaction);
  if (executeTxResponse) {
    const receipt = await executeTxResponse?.transactionResponse?.wait();
    return receipt;
  }
  return null;
};
