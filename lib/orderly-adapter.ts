import { EthersProvider } from "@orderly.network/web3-provider-ethers";
import { DefaultEVMWalletAdapter } from "@orderly.network/default-evm-adapter";
import { DefaultSolanaWalletAdapter } from "@orderly.network/default-solana-adapter";

// Factory: create EVM adapter (for MetaMask, Coinbase, etc.)
function makeEvmAdapter() {
  return new DefaultEVMWalletAdapter(new EthersProvider());
}

// Factory: create Solana adapter (for Phantom, Solflare, etc.)
function makeSolanaAdapter() {
  return new DefaultSolanaWalletAdapter();
}

// Keep one instance on the client
let evmAdapter: DefaultEVMWalletAdapter | null = null;
let solanaAdapter: DefaultSolanaWalletAdapter | null = null;

export function getEvmAdapter() {
  if (!evmAdapter) evmAdapter = makeEvmAdapter();
  return evmAdapter;
}

export function getSolanaAdapter() {
  if (!solanaAdapter) solanaAdapter = makeSolanaAdapter();
  return solanaAdapter;
}
