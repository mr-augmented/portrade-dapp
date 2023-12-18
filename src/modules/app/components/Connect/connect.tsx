'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useConnect } from 'wagmi';
import { useNotificationContext } from '../../providers/notification.provider';

export default function Connect() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const notification = useNotificationContext();

  useEffect(() => {
    if (error) {
      //@ts-ignore
      if (error.name) {
        //@ts-ignore
        notification.error(error.name);
      } else {
        notification.error(500, 'Uh oh, something went wrong. Please try again later.');
      }
    }
  }, [error]);

  useEffect(() => {
    console.log(connectors);
  }, [connectors]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
      {connectors.map((connector) => (
        <button className='btn btn-primary' disabled={isLoading} key={connector.id} onClick={() => connect({ connector })}>
          {'Connect Wallet'}
          <Image className='w-8 h-8 rounded-lg' priority alt='wallet' src={connector.id == 'metaMask' ? '/images/logos/metamask.png' : '/images/logos/coinbase.png'} width={475} height={475} />
          {isLoading && pendingConnector?.id === connector.id && <span className='loading loading-spinner'></span>}
        </button>
      ))}
    </div>
  );
}
