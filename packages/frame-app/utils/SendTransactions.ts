import { ethers } from 'ethers';

export const sendTransaction = async (txs: any[]) => {
  const txToSend = txs?.[0];
  // @ts-ignore
  const { privateKey } = window.authApi.getDataFromLocalStorage();

  const url = "https://rpc.gnosischain.com";
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(privateKey);
  const walletSigner = wallet.connect(customHttpProvider);
  const gasPrice = await customHttpProvider.getGasPrice();

  const tx = {
    from: wallet.address,
    to: txToSend?.to,
    value: ethers.utils.parseEther(txToSend?.value),
    nonce: customHttpProvider.getTransactionCount(wallet.address, "latest"),
    gasPrice,
    data: txToSend?.data,
  };

  walletSigner.sendTransaction(tx).then((transaction) => {
    console.log("send tx", transaction);
  });
};

export const signMessage = async (msg: string) => {
  // @ts-ignore
  const { privateKey } = window.authApi.getDataFromLocalStorage();
  const wallet = new ethers.Wallet(privateKey);
  const signature = wallet.signMessage("my awesome message");
  return signature;
};
