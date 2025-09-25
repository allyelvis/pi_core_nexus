import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

const MOCK_CHAINS = ['Ethereum', 'Solana', 'Binance Smart Chain', 'Polygon'];

const ChainSelector: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ value, onChange }) => (
    <div className="relative">
        <select value={value} onChange={onChange} className="w-full appearance-none px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors pr-8">
            {MOCK_CHAINS.map(c => <option key={c} value={c} className="bg-gray-800">{c}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
);

export const BridgeModal: React.FC<BridgeModalProps> = ({ isOpen, onClose, balance }) => {
  const [amount, setAmount] = useState('');
  const [chain, setChain] = useState('Ethereum');
  
  const handleAction = () => {
    alert(`This is a demo. Your request to bridge ${amount} Pi to ${chain} has been recorded.`);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setAmount('');
        setChain('Ethereum');
      }, 300);
    }
  }, [isOpen]);

  const networkFee = chain === 'Ethereum' ? 0.1 : 0.01;
  const isFormValid = parseFloat(amount) > networkFee && parseFloat(amount) <= balance;

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
          <h3 className="text-xl font-bold text-white">Bridge Pi</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-400">Transfer your Pi from the mainnet to another blockchain.</p>
          <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
              <div className="relative">
                <input type="number" placeholder="0.0000" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-4 pr-12 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 font-semibold">PI</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Balance: {balance.toFixed(4)} Pi</p>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Destination Chain</label>
              <ChainSelector value={chain} onChange={e => setChain(e.target.value)} />
          </div>
          <div className="text-sm text-gray-400 bg-gray-900/50 p-3 rounded-md space-y-1">
            <div className="flex justify-between"><span>Network Fee:</span> <span className="font-mono">~{networkFee.toFixed(4)} Pi</span></div>
            <div className="flex justify-between border-t border-gray-700 pt-1 mt-1">
                <span className="font-semibold">You will receive:</span> 
                <span className="font-mono font-semibold text-white">
                    {Math.max(0, (parseFloat(amount) || 0) - networkFee).toFixed(4)} Pi
                </span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4 rounded-b-xl">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAction} disabled={!isFormValid}>Bridge Funds</Button>
        </div>
      </div>
      <style>{`.animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; } @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};