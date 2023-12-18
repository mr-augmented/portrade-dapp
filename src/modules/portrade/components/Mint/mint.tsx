'use client';

import Image from 'next/image';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import MintButton from '../MintButton/mintButton';
import { useEffect, useMemo, useState } from 'react';
import { PORTRADE_ABI } from '@/modules/app/abi/portrade';
import { useNotificationContext } from '@/modules/app/providers/notification.provider';
import { PORTRADE_ADDRESSES } from '@/modules/app/constants/contracts';
import { readContract, writeContract } from 'wagmi/actions';
import { signMint } from '../../services/portrade.service';
import { GUARENTEE_LIST, WHITE_LIST } from '../../constants/portrade.constants';
import { NotificationTypesEnum } from '@/modules/app/models/notification.models';

interface IMintProps {
  chainId: number;
}

export default function Mint({ chainId }: IMintProps) {
  const notification = useNotificationContext();

  const { address } = useAccount();
  const {
    data: balance,
    isError: isErrorBalance,
    isLoading: isLoadingBalance,
  } = useBalance({
    address: address,
  });

  const [isSoldOut, setIsSoldOut] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPublicMint, setIsPublicMint] = useState(false);
  const [isGuarenteedMint, setIsGuarenteedMint] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleMint = async () => {
    setIsLoading(true);
    try {
      let tokenId = -1;
      let soldOut = await readContract({
        address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
        abi: PORTRADE_ABI,
        functionName: 'isSoldOut',
      });
      if (!soldOut) {
        const ethPrice = await readContract({
          address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
          abi: PORTRADE_ABI,
          functionName: 'ethPrice',
        });
        const attemptedIds: number[] = [];
        do {
          const id = Math.floor(Math.random() * 100);
          if (!attemptedIds.includes(id)) {
            const available = await readContract({
              address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
              abi: PORTRADE_ABI,
              functionName: 'isAvailable',
              args: [id],
            });
            if (available) {
              tokenId = id;
            } else {
              attemptedIds.push(id);
            }
          }
          soldOut = await readContract({
            address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
            abi: PORTRADE_ABI,
            functionName: 'isSoldOut',
          });
          if (soldOut) {
            break;
          }
        } while (tokenId == -1);
        if (balance) {
          const etherUnits = '1000000000000000000';
          // @ts-ignore
          const ethBalance = BigInt(balance.formatted * etherUnits);
          if (ethBalance >= (ethPrice as bigint)) {
            if (isPublicMint) {
              console.log('public mint');
              await writeContract({
                address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
                abi: PORTRADE_ABI,
                functionName: 'mintPublic',
                args: [tokenId],
                value: ethPrice as bigint,
              });
              setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(false);
              }, 3000);
              notification.notify('Minted! Your NFT will appear in your wallet shortly.', NotificationTypesEnum.SUCCESS);
            } else {
              console.log('whitelist mint');
              if (isGuarenteedMint) {
                if (GUARENTEE_LIST.includes(address || '')) {
                  const signature = await signMint(address || '', tokenId);
                  await writeContract({
                    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
                    abi: PORTRADE_ABI,
                    functionName: 'mint',
                    args: [signature, tokenId],
                    value: ethPrice as bigint,
                  });
                  setIsSuccess(true);
                  setTimeout(() => {
                    setIsSuccess(false);
                  }, 3000);
                  notification.notify('Minted! Your NFT will appear in your wallet shortly.', NotificationTypesEnum.SUCCESS);
                } else {
                  notification.error(500, 'Uh oh! You are not on the guarentee list.');
                  setIsError(true);
                  setTimeout(() => {
                    setIsError(false);
                  }, 3000);
                }
              } else {
                if (WHITE_LIST.includes(address || '') || GUARENTEE_LIST.includes(address || '')) {
                  const signature = await signMint(address || '', tokenId);
                  await writeContract({
                    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
                    abi: PORTRADE_ABI,
                    functionName: 'mint',
                    args: [signature, tokenId],
                    value: ethPrice as bigint,
                  });
                  setIsSuccess(true);
                  setTimeout(() => {
                    setIsSuccess(false);
                  }, 3000);
                  notification.notify('Minted! Your NFT will appear in your wallet shortly.', NotificationTypesEnum.SUCCESS);
                } else {
                  notification.error(500, 'Uh oh! You are not on the whitelist.');
                  setIsError(true);
                  setTimeout(() => {
                    setIsError(false);
                  }, 3000);
                }
              }
            }
          } else {
            notification.error(500, 'Uh oh! You do not have enough ETH to mint.');
            setIsError(true);
            setTimeout(() => {
              setIsError(false);
            }, 3000);
          }
        } else {
          notification.error(500, 'Uh oh! You do not have enough ETH to mint.');
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      } else {
        notification.error(500, 'Uh oh! We are sold out!');
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      notification.error(500, 'Uh oh! Something went wrong.');
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
    setIsLoading(false);
  };

  const {
    data: isPausedData,
    isError: isErrorPaused,
    isLoading: isLoadingPaused,
  } = useContractRead({
    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
    abi: PORTRADE_ABI,
    functionName: 'isPaused',
  });

  const {
    data: isSoldOutData,
    isError: isErrorSoldOut,
    isLoading: isLoadingSoldOut,
  } = useContractRead({
    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
    abi: PORTRADE_ABI,
    functionName: 'isSoldOut',
  });

  const {
    data: isPublicMintData,
    isError: isErrorPublicMint,
    isLoading: isLoadingPublicMint,
  } = useContractRead({
    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
    abi: PORTRADE_ABI,
    functionName: 'isPublicMint',
  });

  const {
    data: isGuarenteedMintData,
    isError: isErrorGuarenteedMint,
    isLoading: isLoadingGuarenteedMint,
  } = useContractRead({
    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
    abi: PORTRADE_ABI,
    functionName: 'isGuaranteedMint',
  });

  const {
    data: mintLimitData,
    isError: isErrorMintLimit,
    isLoading: isLoadingMintLimit,
  } = useContractRead({
    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
    abi: PORTRADE_ABI,
    functionName: 'MINT_LIMIT',
  });

  const {
    data: mintCountData,
    isError: isErrorMintCount,
    isLoading: isLoadingMintCount,
  } = useContractRead({
    address: PORTRADE_ADDRESSES[chainId] as `0x${string}`,
    abi: PORTRADE_ABI,
    functionName: 'totalBalances',
    args: [address],
  });

  useEffect(() => {
    if (isLoadingPaused || isLoadingSoldOut || isLoadingPublicMint || isLoadingBalance || isLoadingMintLimit || isLoadingMintCount || isLoadingGuarenteedMint) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingPaused, isLoadingSoldOut, isLoadingPublicMint, isLoadingBalance, isLoadingMintLimit, isLoadingMintCount, isLoadingGuarenteedMint]);

  useEffect(() => {
    if (isErrorPaused || isErrorSoldOut || isErrorPublicMint || isErrorBalance || isErrorMintLimit || isErrorMintCount || isErrorGuarenteedMint) {
      setIsError(true);
    }
  }, [isErrorPaused, isErrorSoldOut, isErrorPublicMint, isErrorBalance, isErrorMintLimit, isErrorMintCount, isErrorGuarenteedMint]);

  useEffect(() => {
    if (isPausedData) {
      setIsPaused(isPausedData as boolean);
    }
  }, [isPausedData]);

  useEffect(() => {
    if (isSoldOutData) {
      setIsSoldOut(isSoldOutData as boolean);
    }
  }, [isSoldOutData]);

  useEffect(() => {
    if (isPublicMintData) {
      setIsPublicMint(isPublicMintData as boolean);
    }
  }, [isPublicMintData]);

  useEffect(() => {
    if (isGuarenteedMintData) {
      setIsGuarenteedMint(isGuarenteedMintData as boolean);
    }
  }, [isGuarenteedMintData]);

  const canMint = useMemo(() => {
    if (mintCountData !== undefined && mintLimitData !== undefined) {
      return (mintCountData as bigint) < (mintLimitData as bigint);
    } else {
      return false;
    }
  }, [mintCountData, mintLimitData]);
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      {isSoldOut ? (
        <>
          <button className='btn btn-primary' disabled>
            Sold Out
          </button>
          <div className='flex flex-row justify-center'>
            <Image className='animate-fade animate-once' priority alt='wallet' src='/images/success.png' width={475} height={475} />
          </div>
        </>
      ) : (
        <>
          {isPaused ? (
            <>
              <button className='btn btn-primary' disabled>
                Mint closed
              </button>
              <div className='flex flex-row justify-center'>
                <Image className='animate-fade animate-once' priority alt='wallet' src='/images/loading.png' width={475} height={475} />
              </div>
            </>
          ) : (
            <>
              {!canMint ? (
                <>
                  <button className='btn btn-primary' disabled>
                    You have reached your mint limit
                  </button>
                  <div className='flex flex-row justify-center'>
                    <Image className='animate-fade animate-once' priority alt='wallet' src='/images/success.png' width={475} height={475} />
                  </div>
                </>
              ) : (
                <>
                  <MintButton onClick={async () => handleMint()} isLoading={isLoading} disabled={isLoading || isError} label={'mint'} />
                  <div className='flex flex-row justify-center'>
                    <>
                      {!isLoading && !isError && !isSuccess && <Image className='animate-fade animate-once' priority alt='wallet' src='/images/mint.png' width={475} height={475} />}
                      {isLoading && <Image className='animate-fade animate-once' priority alt='wallet' src='/images/loading.png' width={475} height={475} />}
                      {isError && <Image className='animate-fade animate-once' priority alt='wallet' src='/images/sad.png' width={475} height={475} />}
                      {isSuccess && <Image className='animate-fade animate-once' priority alt='wallet' src='/images/success.png' width={475} height={475} />}
                    </>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
