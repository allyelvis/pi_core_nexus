
import { Product, Video, Game, Transaction } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Quantum Headset', description: 'Next-gen VR/AR headset.', pricePi: 50, priceUsd: 1500, imageUrl: 'https://picsum.photos/seed/product1/400/300', seller: 'NexusGear' },
  { id: '2', name: 'Chrono Watch', description: 'A sleek, futuristic timepiece.', pricePi: 25, priceUsd: 750, imageUrl: 'https://picsum.photos/seed/product2/400/300', seller: 'FutureTech' },
  { id: '3', name: 'Hoverboard X', description: 'Personal mobility device.', pricePi: 80, priceUsd: 2400, imageUrl: 'https://picsum.photos/seed/product3/400/300', seller: 'NexusGear' },
  { id: '4', name: 'Data Crystal', description: 'Holographic data storage.', pricePi: 15, priceUsd: 450, imageUrl: 'https://picsum.photos/seed/product4/400/300', seller: 'CoreSystems' },
  { id: '5', name: 'Synth Jacket', description: 'Color-changing smart fabric.', pricePi: 40, priceUsd: 1200, imageUrl: 'https://picsum.photos/seed/product5/400/300', seller: 'FutureTech' },
  { id: '6', name: 'AI Pet Companion', description: 'A loyal robotic friend.', pricePi: 100, priceUsd: 3000, imageUrl: 'https://picsum.photos/seed/product6/400/300', seller: 'CoreSystems' },
];

export const MOCK_VIDEOS: Video[] = [
  { id: '1', title: 'Cyberpunk 2088 Live Gameplay', streamer: 'PixelPilot', thumbnailUrl: 'https://picsum.photos/seed/video1/400/225', videoUrl: '', isLive: true },
  { id: '2', title: 'Pi Tokenomics Explained', streamer: 'CryptoClara', thumbnailUrl: 'https://picsum.photos/seed/video2/400/225', videoUrl: '', isLive: false },
  { id: '3', title: 'Unboxing the Quantum Headset', streamer: 'TechTom', thumbnailUrl: 'https://picsum.photos/seed/video3/400/225', videoUrl: '', isLive: false },
  { id: '4', title: 'Nexus Game Dev Session', streamer: 'DevDave', thumbnailUrl: 'https://picsum.photos/seed/video4/400/225', videoUrl: '', isLive: true },
];

export const MOCK_GAMES: Game[] = [
  { id: '1', title: 'Galaxy Raiders', genre: 'Sci-Fi MMO', thumbnailUrl: 'https://picsum.photos/seed/game1/400/500' },
  { id: '2', title: 'Pi Kart Racer', genre: 'Racing', thumbnailUrl: 'https://picsum.photos/seed/game2/400/500' },
  { id: '3', title: 'Nexus Defenders', genre: 'Tower Defense', thumbnailUrl: 'https://picsum.photos/seed/game3/400/500' },
  { id: '4', title: 'Crypto Tycoon', genre: 'Strategy Sim', thumbnailUrl: 'https://picsum.photos/seed/game4/400/500' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', type: 'Purchase', amountPi: -50, description: 'Quantum Headset', date: '2024-07-28' },
    { id: '2', type: 'Reward', amountPi: 10, description: 'Galaxy Raiders Daily Quest', date: '2024-07-28' },
    { id: '3', type: 'Sale', amountPi: 25, description: 'Chrono Watch', date: '2024-07-27' },
    { id: '4', type: 'Transfer', amountPi: -5, description: 'Sent to @User123', date: '2024-07-26' },
];
