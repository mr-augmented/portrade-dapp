'use client';

import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

interface IDappProviderProps {
  children: React.ReactNode;
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_KEY || '',
    }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Portrade Dapp',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function DappProvider({ children }: IDappProviderProps): React.ReactNode {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
