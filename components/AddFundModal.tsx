import React from 'react';
import { Button } from './Button';

interface AddFundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 18h14M6 14h12M7 10h10M4 5h16v3H4z" /></svg>;
const CardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7-5h12a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" /></svg>;

export const AddFundModal: React.FC<AddFundModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleOptionClick = (option: string) => {
    alert(`${option} is a demo feature. No real transaction will be made.`);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-labelledby="add-fund-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl shadow-purple-900/20 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 id="add-fund-modal-title" className="text-xl font-bold text-white">Add Funds</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-6">How would you like to add funds?</p>
          <div className="space-y-4">
            <Button variant="outline" className="w-full text-left justify-start py-3 text-base" onClick={() => handleOptionClick('Bank Transfer')}>
              <BankIcon /> Bank Transfer (ACH)
            </Button>
            <Button variant="outline" className="w-full text-left justify-start py-3 text-base" onClick={() => handleOptionClick('Card Payment')}>
              <CardIcon /> Credit/Debit Card
            </Button>
          </div>
           <p className="text-xs text-gray-500 mt-6 text-center">This is a demo feature. No real funds will be transferred.</p>
        </div>
        <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-4 rounded-b-xl">
          <Button variant="secondary" onClick={onClose}>Close</Button>
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