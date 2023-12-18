'use client';

import Connect from '@/modules/app/components/Connect/connect';
import Mint from '@/modules/portrade/components/Mint/mint';
import { mainnet, sepolia, useAccount, useNetwork } from 'wagmi';
import Image from 'next/image';
import { useMemo } from 'react';
import { ENVIRONMENT } from '@/modules/app/constants/app';
import SwitchNetwork from '@/modules/app/components/SwitchNetwork/switchNetwork';

export default function Home() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const supportedChain = useMemo(() => {
    return ENVIRONMENT == 'development' ? sepolia : mainnet;
  }, []);

  const switchNetwork = useMemo(() => {
    return chain?.id !== supportedChain.id;
  }, [chain, supportedChain]);

  return (
    <div className='hero'>
      <div className='hero-content p-0 w-full text-center'>
        <div className='max-w-full w-full'>
          {isConnected ? (
            <>
              {switchNetwork ? (
                <div className='flex flex-col justify-center items-center w-full h-full'>
                  <SwitchNetwork />
                  <div className='flex flex-row justify-center'>
                    <Image className='animate-fade animate-once' priority alt='wallet' src='/images/connect.png' width={475} height={475} />
                  </div>
                </div>
              ) : (
                <Mint chainId={chain?.id || 11155111} />
              )}
            </>
          ) : (
            <div className='flex flex-col justify-center items-center w-full h-full'>
              <Connect />
              <div className='flex flex-row justify-center'>{!isConnected && <Image className='animate-fade animate-once' priority alt='wallet' src='/images/connect.png' width={475} height={475} />}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
