import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import APIClient from './api';

const HELIUS_RPC_ENDPOINT = 'https://mainnet.helius-rpc.com/?api-key=b949b8c4-ffbd-40f7-b74c-1daf99b6e23a';
const RPC_ENDPOINT = import.meta.env.VITE_HELIUS_RPC_URL || HELIUS_RPC_ENDPOINT;

const connection = new Connection(RPC_ENDPOINT, 'confirmed');

export async function getTokenBalance(walletAddress: string, tokenAddress: string): Promise<number> {
  try {
    if (tokenAddress === 'DevnetTokenPlaceholder') {
      return 10000;
    }
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Failed to get token balance:', error);
    return 0;
  }
}

export async function getStakedAmount(walletAddress: string, tokenSymbol: string): Promise<number> {
  try {
    const stakes: any[] = await APIClient.get(`/staking/stakes/${walletAddress}`);
    const activeStake = stakes.find(s => s.token_symbol === tokenSymbol && !s.unstake_date);
    return activeStake?.staked_amount || 0;
  } catch (error) {
    console.error('Failed to get staked amount:', error);
    return 0;
  }
}

export async function stakeTokens(
  wallet: any,
  tokenAddress: string,
  amount: number,
  stakingProgramAddress: string
): Promise<string> {
  try {
    if (!wallet || !wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    let signature: string;

    if (stakingProgramAddress === 'DevnetStakingPlaceholder' || tokenAddress === 'DevnetTokenPlaceholder') {
      signature = 'simulated_stake_' + Date.now() + '_' + Math.random().toString(36).substring(7);

      await new Promise(resolve => setTimeout(resolve, 1500));
    } else {
      const fromPubkey = wallet.publicKey;
      const toPubkey = new PublicKey(stakingProgramAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      const signed = await wallet.signTransaction(transaction);
      signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature, 'confirmed');
    }

    // Record stake via API (mock for now - would need backend endpoint)
    console.log('Stake recorded:', {
      walletAddress: wallet.publicKey.toString(),
      tokenSymbol: 'PARALLY',
      amount,
      signature,
    });

    return signature;
  } catch (error) {
    console.error('Staking failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to stake tokens');
  }
}

export async function unstakeTokens(
  wallet: any,
  tokenAddress: string,
  amount: number,
  stakingProgramAddress: string
): Promise<string> {
  try {
    if (!wallet || !wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    let signature: string;

    if (stakingProgramAddress === 'DevnetStakingPlaceholder' || tokenAddress === 'DevnetTokenPlaceholder') {
      signature = 'simulated_unstake_' + Date.now() + '_' + Math.random().toString(36).substring(7);

      await new Promise(resolve => setTimeout(resolve, 1500));
    } else {
      const fromPubkey = new PublicKey(stakingProgramAddress);
      const toPubkey = wallet.publicKey;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: Math.floor(amount * LAMPORTS_PER_SOL),
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = toPubkey;

      const signed = await wallet.signTransaction(transaction);
      signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature, 'confirmed');
    }

    // Record unstake via API (mock for now - would need backend endpoint)
    console.log('Unstake recorded:', {
      walletAddress: wallet.publicKey.toString(),
      tokenSymbol: 'PARALLY',
      amount,
      signature,
    });

    return signature;
  } catch (error) {
    console.error('Unstaking failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to unstake tokens');
  }
}

export async function getTotalValueLocked(tokenSymbol: string): Promise<number> {
  try {
    const configs: any[] = await APIClient.get('/staking/config');
    const config = configs.find(c => c.token_symbol === tokenSymbol);
    return config?.total_value_locked || 0;
  } catch (error) {
    console.error('Failed to get TVL:', error);
    return 0;
  }
}
