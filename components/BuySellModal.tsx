import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './Button';
import { usePrice } from '../hooks/usePrice';

interface BuySellModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export const BuySellModal: React.FC<BuySellModalProps> = ({ isOpen, onClose, balance }) => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [piAmount, setPiAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [error, setError] = useState('');
  const { prices } = usePrice();
  const piPriceUsd = prices.pi;
  
  const handleAction = () => {
    alert(`This is a demo. Your request to ${mode} ${piAmount} Pi has been recorded.`);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPiAmount('');
        setUsdAmount('');
        setError('');
        setMode('buy');
      }, 300);
    }
  }, [isOpen]);

  const handlePiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        setPiAmount(value);
        if(value) {
            setUsdAmount((parseFloat(value) * piPriceUsd).toFixed(2));
        } else {
            setUsdAmount('');
        }
    }
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        setUsdAmount(value);
        if(value) {
            setPiAmount((parseFloat(value) / piPriceUsd).toFixed(4));
        } else {
            setPiAmount('');
        }
    }
  };
  
  const isFormValid = useMemo(() => {
      const numericPi = parseFloat(piAmount);
      if (isNaN(numericPi) || numericPi <= 0) return false;
      if (mode === 'sell' && numericPi > balance) {
          setError('Amount exceeds your balance.');
          return false;
      }
      setError('');
      return true;
  }, [piAmount, mode, balance]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl shadow-purple-900/20 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Buy / Sell Pi</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex bg-gray-900 rounded-md p-1 mb-6">
            <button onClick={() => setMode('buy')} className={`w-1/2 py-2 rounded-md ${mode === 'buy' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'} transition-all text-sm font-semibold`}>Buy</button>
            <button onClick={() => setMode('sell')} className={`w-1/2 py-2 rounded-md ${mode === 'sell' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'} transition-all text-sm font-semibold`}>Sell</button>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-900/70 p-4 rounded-lg">
              <label className="block text-xs font-medium text-gray-400 mb-1">{mode === 'buy' ? 'You spend' : 'You receive'}</label>
              <div className="relative">
                <input type="number" placeholder="0.00" value={usdAmount} onChange={handleUsdChange} className="w-full bg-transparent text-2xl text-white focus:outline-none pr-12"/>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">USD</span>
              </div>
            </div>
            <div className="bg-gray-900/70 p-4 rounded-lg">
              <label className="block text-xs font-medium text-gray-400 mb-1">{mode === 'buy' ? 'You receive' : 'You sell'}</label>
              <div className="relative">
                <input type="number" placeholder="0.0000" value={piAmount} onChange={handlePiChange} className="w-full bg-transparent text-2xl text-white focus:outline-none pr-12"/>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-400 font-semibold">PI</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-center text-gray-400 mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>1 Pi ≈ ${piPriceUsd.toFixed(2)} USD</span>
          </div>
          {mode === 'sell' && <div className="text-sm text-center text-gray-400 mt-2">Your balance: {balance.toFixed(4)} Pi</div>}
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </div>
        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4 rounded-b-xl">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAction} disabled={!isFormValid}>{mode === 'buy' ? 'Buy Pi' : 'Sell Pi'}</Button>
        </div>
      </div>
      <style>{`.animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; } @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};