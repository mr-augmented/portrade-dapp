'use client';

import { useEffect, useMemo } from 'react';
import { useNotificationContext } from '../../providers/notification.provider';
import { mainnet, sepolia, useSwitchNetwork } from 'wagmi';
import { ENVIRONMENT } from '../../constants/app';

export default function SwitchNetwork() {
  const { error, isLoading, switchNetwork } = useSwitchNetwork();

  const notification = useNotificationContext();

  const supportedChain = useMemo(() => {
    return ENVIRONMENT == 'development' ? sepolia : mainnet;
  }, []);

  useEffect(() => {
    if (error) {
      //@ts-ignore
      notification.error(error.name);
    }
  }, [error]);

  return (
    <div>
      <button className='btn btn-primary' disabled={isLoading} onClick={() => switchNetwork?.(supportedChain.id)}>
        {'Switch Network'}
        {isLoading && <span className='loading loading-spinner'></span>}
      </button>
    </div>
  );
}
