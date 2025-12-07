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
    const { data, error } = await supabase
      .from('user_stakes')
      .select('staked_amount')
      .eq('wallet_address', walletAddress)
      .eq('token_symbol', tokenSymbol)
      .is('unstake_date', null)
      .maybeSingle();

    if (error) {
      console.error('Failed to get staked amount:', error);
      return 0;
    }

    return data?.staked_amount || 0;
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

    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stake-tokens`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: wallet.publicKey.toString(),
        tokenSymbol: 'PARALLY',
        amount,
        signature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to record stake');
    }

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

    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/unstake-tokens`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: wallet.publicKey.toString(),
        tokenSymbol: 'PARALLY',
        amount,
        signature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to record unstake');
    }

    return signature;
  } catch (error) {
    console.error('Unstaking failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to unstake tokens');
  }
}

export async function getTotalValueLocked(tokenSymbol: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_stakes')
      .select('staked_amount')
      .eq('token_symbol', tokenSymbol)
      .is('unstake_date', null);

    if (error) {
      console.error('Failed to get TVL:', error);
      return 0;
    }

    return data?.reduce((sum, stake) => sum + (stake.staked_amount || 0), 0) || 0;
  } catch (error) {
    console.error('Failed to get TVL:', error);
    return 0;
  }
}
