import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { usePrice } from '../hooks/usePrice';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

const MOCK_BALANCES = { ETH: 2.5, BTC: 0.1 };
const ASSETS = ['PI', 'ETH', 'BTC'];

const AssetSelector: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, disabledAsset: string }> = ({ value, onChange, disabledAsset }) => (
    <div className="relative">
        <select value={value} onChange={onChange} className="appearance-none bg-gray-700/50 hover:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold cursor-pointer transition-colors pr-8">
            {ASSETS.filter(a => a !== disabledAsset).map(asset => <option key={asset} value={asset} className="bg-gray-800">{asset}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
);

export const SwapModal: React.FC<SwapModalProps> = ({ isOpen, onClose, balance }) => {
  const [fromAsset, setFromAsset] = useState('PI');
  const [toAsset, setToAsset] = useState('ETH');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const { prices } = usePrice();

  const handleAction = () => {
    alert(`This is a demo. Your request to swap ${fromAmount} ${fromAsset} for ${toAmount} ${toAsset} has been recorded.`);
    onClose();
  };
  
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFromAsset('PI');
        setToAsset('ETH');
        setFromAmount('');
        setToAmount('');
      }, 300);
    }
  }, [isOpen]);
  
  const getRate = (from: string, to: string) => {
      const fromPrice = prices[from.toLowerCase() as keyof typeof prices];
      const toPrice = prices[to.toLowerCase() as keyof typeof prices];
      if (!fromPrice || !toPrice) return 0;
      return fromPrice / toPrice;
  };
  
  useEffect(() => {
    const numericFrom = parseFloat(fromAmount);
    if (!isNaN(numericFrom) && fromAmount) {
      const rate = getRate(fromAsset, toAsset);
      setToAmount((numericFrom * rate).toFixed(5));
    } else {
        setToAmount('');
    }
  }, [fromAmount, fromAsset, toAsset, prices]);

  const handleAssetSwap = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount(toAmount);
  };
  
  const getBalance = (asset: string) => {
      if (asset === 'PI') return balance;
      return MOCK_BALANCES[asset as keyof typeof MOCK_BALANCES] ?? 0;
  }
  
  const rate = getRate(fromAsset, toAsset);
  const isFormValid = parseFloat(fromAmount) > 0 && parseFloat(fromAmount) <= getBalance(fromAsset);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl shadow-purple-900/20 w-full max-w-md transform animate-fade-in-scale"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Swap Assets</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 relative">
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">From</span>
                <span className="text-xs text-gray-400">Balance: {getBalance(fromAsset).toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-4">
              <input type="number" placeholder="0.0" value={fromAmount} onChange={e => setFromAmount(e.target.value)} className="w-full bg-transparent text-2xl text-white focus:outline-none"/>
              <AssetSelector value={fromAsset} onChange={e => setFromAsset(e.target.value)} disabledAsset={toAsset} />
            </div>
          </div>
          
          <div className="flex justify-center my-[-1rem] relative z-10">
              <button onClick={handleAssetSwap} className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 transition-all text-white transform hover:rotate-180 duration-300 ring-4 ring-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 12L3 8m4 8l4-8m11 4h-5m5 0l-2-2m2 2l-2 2" /></svg>
              </button>
          </div>

           <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">To (estimated)</span>
                <span className="text-xs text-gray-400">Balance: {getBalance(toAsset).toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-4">
              <input type="number" placeholder="0.0" value={toAmount} readOnly className="w-full bg-transparent text-2xl text-white focus:outline-none cursor-not-allowed"/>
              <AssetSelector value={toAsset} onChange={e => setToAsset(e.target.value)} disabledAsset={fromAsset} />
            </div>
          </div>
          <div className="text-sm text-center text-gray-400 pt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Rate: 1 {fromAsset} ≈ {rate.toFixed(4)} {toAsset}</span>
          </div>
        </div>
        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4 rounded-b-xl">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAction} disabled={!isFormValid}>Swap</Button>
        </div>
      </div>
      <style>{`.animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; } @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};