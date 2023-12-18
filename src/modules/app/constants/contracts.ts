import { sepolia, mainnet } from 'wagmi/chains';

export const PORTRADE_ADDRESSES: Record<number, string> = {
  [mainnet.id]: '0x80915b847e591384e0bfea3026faddb9acd5bc05',
  [sepolia.id]: '0x71e38b8d59e0e80d52be671dee6e172ace5943b7',
};
