
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  piBalance: number;
  walletAddress: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  pricePi: number;
  priceUsd: number;
  imageUrl: string;
  seller: string;
}

export interface Video {
  id: string;
  title: string;
  streamer: string;
  thumbnailUrl: string;
  videoUrl: string;
  isLive: boolean;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  thumbnailUrl: string;
}

export interface Transaction {
  id: string;
  type: 'Purchase' | 'Sale' | 'Reward' | 'Transfer';
  amountPi: number;
  description: string;
  date: string;
}