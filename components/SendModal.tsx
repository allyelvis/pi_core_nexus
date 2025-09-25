import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (recipient: string, amount: number) => void;
  balance: number;
}

const PiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h2a1 1 0 110 2H11v8h1a1 1 0 110 2h-2a1 1 0 110-2h1V6H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

export const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, onSend, balance }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setRecipient('');
        setAmount('');
        setError('');
      }, 300); // Reset after closing animation
    }
  }, [isOpen]);

  useEffect(() => {
      const numericAmount = parseFloat(amount);
      if (amount && numericAmount <= 0) {
          setError('Amount must be positive.');
      } else if (numericAmount > balance) {
          setError('Amount exceeds your balance.');
      } else {
          setError('');
      }
  }, [amount, balance]);


  const handleSend = () => {
    const numericAmount = parseFloat(amount);
    if (!recipient.startsWith('@')) {
        setError('Recipient must start with @');
        return;
    }
    if (recipient.length < 2) {
        setError('Invalid recipient username.');
        return;
    }
    if (!amount || numericAmount <= 0) {
        setError('Please enter a valid amount.');
        return;
    }
    if (numericAmount > balance) {
        setError('Amount exceeds your balance.');
        return;
    }
    setError('');
    onSend(recipient, numericAmount);
  };

  if (!isOpen) {
    return null;
  }
  
  const isFormValid = recipient.length > 1 && recipient.startsWith('@') && parseFloat(amount) > 0 && parseFloat(amount) <= balance;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-labelledby="send-pi-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl shadow-purple-900/20 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 id="send-pi-modal-title" className="text-xl font-bold text-white">Send Pi</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 bg-gray-900/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Your Balance</p>
              <p className="text-lg font-semibold text-purple-400 flex items-center">
                  <PiIcon /> {balance.toFixed(4)}
              </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-1">Recipient</label>
              <input
                id="recipient"
                type="text"
                placeholder="@username"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <PiIcon />
                 </div>
                <input
                  id="amount"
                  type="number"
                  placeholder="0.0000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                />
              </div>
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
        </div>
        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4 rounded-b-xl">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSend} disabled={!isFormValid}>Send</Button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};