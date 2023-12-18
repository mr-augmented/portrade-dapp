import { ethers } from 'ethers';

export async function signMint(address: string, tokenId: number) {
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_SIGNER_PRIVATE_KEY || '');
  const addressHash = ethers.solidityPackedKeccak256(['address', 'uint'], [address, tokenId]);
  const message = ethers.toBeArray(addressHash);
  const signature = await signer.signMessage(message);

  return signature;
}
