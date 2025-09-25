import React, { useState } from 'react';
import { Button } from './Button';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


export const ReceiveModal: React.FC<ReceiveModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  if (!isOpen) {
    return null;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(walletAddress)}&bgcolor=111827&color=c4b5fd&qzone=1`;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-labelledby="receive-pi-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl shadow-purple-900/20 w-full max-w-sm transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 id="receive-pi-modal-title" className="text-xl font-bold text-white">Receive Pi</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-4 text-center">Share your QR code or address to receive Pi.</p>
            <div className="bg-gray-900 p-4 rounded-lg">
                <img src={qrCodeUrl} alt="Wallet Address QR Code" width="200" height="200" />
            </div>
            <div className="mt-6 w-full">
                <label htmlFor="wallet-address" className="block text-xs font-medium text-gray-400 mb-1">Your Wallet Address</label>
                <div className="relative flex items-center">
                    <input
                        id="wallet-address"
                        type="text"
                        readOnly
                        value={walletAddress}
                        className="w-full pl-3 pr-12 py-2 bg-gray-900 border border-gray-700 rounded-md font-mono text-xs text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                        onClick={handleCopy}
                        className={`absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-md ${copied ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'} text-white transition-all`}
                        aria-label={copied ? "Address copied" : "Copy address"}
                    >
                       {copied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                </div>
            </div>
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