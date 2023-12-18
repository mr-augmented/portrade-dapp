'use client';

import Image from 'next/image';
import { useAccount, useDisconnect } from 'wagmi';
import Icon from '../Icon/icon';

export default function Wallet() {
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <button disabled className='btn btn-ghost btn-circle btn-lg disabled:bg-transparent'>
        <Image src='/images/logo.png' alt='portrade' width={65} height={65} />
      </button>
    );
  }

  return (
    <button className='btn btn-primary' onClick={() => disconnect()}>
      <Icon name={'wallet'} />
      {address && `0x${address.slice(2, 5).toUpperCase()}...${address.slice(-3).toUpperCase()}`}
    </button>
  );
}
