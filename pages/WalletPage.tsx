import React, { useState } from 'react';
import { Section } from '../components/Section';
import { useAuth } from '../hooks/useAuth';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SendModal } from '../components/SendModal';
import { ReceiveModal } from '../components/ReceiveModal';
import { AddFundModal } from '../components/AddFundModal';
import { BuySellModal } from '../components/BuySellModal';
import { SwapModal } from '../components/SwapModal';
import { BridgeModal } from '../components/BridgeModal';
import { BalanceChart } from '../components/BalanceChart';
import { TransactionBreakdownChart } from '../components/TransactionBreakdownChart';


const PiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h2a1 1 0 110 2H11v8h1a1 1 0 110 2h-2a1 1 0 110-2h1V6H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/80 transition-all duration-200 group">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            {icon}
        </div>
        <span className="text-xs font-semibold text-gray-300 group-hover:text-white">{label}</span>
    </button>
);

const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const ReceiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const AddFundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BuySellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const SwapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 12L3 8m4 8l4-8m11 4h-5m5 0l-2-2m2 2l-2 2" /></svg>;
const BridgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const TransactionRow: React.FC<{ tx: Transaction }> = ({ tx }) => {
    const isDebit = tx.amountPi < 0;
    const amountColor = isDebit ? 'text-red-400' : 'text-green-400';
    const sign = isDebit ? '' : '+';

    return (
        <tr className="border-b border-gray-800 hover:bg-gray-800/50">
            <td className="p-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                    tx.type === 'Purchase' ? 'bg-red-900 text-red-300' : 
                    tx.type === 'Sale' ? 'bg-green-900 text-green-300' :
                    tx.type === 'Reward' ? 'bg-blue-900 text-blue-300' :
                    'bg-gray-700 text-gray-300'
                }`}>{tx.type}</span>
            </td>
            <td className="p-4 text-gray-300">{tx.description}</td>
            <td className={`p-4 font-mono ${amountColor}`}>{sign}{tx.amountPi.toFixed(4)}</td>
            <td className="p-4 text-gray-500">{tx.date}</td>
        </tr>
    );
};

const WalletPage: React.FC = () => {
    const { user } = useAuth();
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
    const [isAddFundModalOpen, setIsAddFundModalOpen] = useState(false);
    const [isBuySellModalOpen, setIsBuySellModalOpen] = useState(false);
    const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
    const [isBridgeModalOpen, setIsBridgeModalOpen] = useState(false);

    const handleSendPi = (recipient: string, amount: number) => {
        console.log(`Sending ${amount} Pi to ${recipient}`);
        // In a real app, this would be an API call.
        alert(`Successfully sent ${amount} Pi to ${recipient}!`);
        setIsSendModalOpen(false);
    };

    if (!user) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your wallet.</h2>
                <p className="text-gray-400 mb-8">Your wallet balance and transaction history are private.</p>
                <Link to="/login"><Button variant="primary">Login with Pi</Button></Link>
            </div>
        );
    }
    
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Section title="My Wallet">
                    <div className="bg-gray-800 rounded-lg p-8 mb-8 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <p className="text-gray-400 text-sm">Current Balance</p>
                                <p className="text-4xl md:text-5xl font-bold text-white flex items-center mt-2">
                                <PiIcon /> {user.piBalance.toFixed(4)}
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 my-6"></div>
                        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                            <ActionButton icon={<SendIcon />} label="Send" onClick={() => setIsSendModalOpen(true)} />
                            <ActionButton icon={<ReceiveIcon />} label="Receive" onClick={() => setIsReceiveModalOpen(true)} />
                            <ActionButton icon={<AddFundIcon />} label="Add Fund" onClick={() => setIsAddFundModalOpen(true)} />
                            <ActionButton icon={<BuySellIcon />} label="Buy / Sell" onClick={() => setIsBuySellModalOpen(true)} />
                            <ActionButton icon={<SwapIcon />} label="Swap" onClick={() => setIsSwapModalOpen(true)} />
                            <ActionButton icon={<BridgeIcon />} label="Bridge" onClick={() => setIsBridgeModalOpen(true)} />
                        </div>
                    </div>
                </Section>
                
                <Section title="Wallet Analytics">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                        <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-white">Balance History</h3>
                             <div className="h-64">
                                <BalanceChart transactions={MOCK_TRANSACTIONS} currentBalance={user.piBalance} />
                             </div>
                        </div>
                        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-white">Transaction Breakdown</h3>
                            <div className="h-64 flex items-center justify-center">
                                <TransactionBreakdownChart transactions={MOCK_TRANSACTIONS} />
                            </div>
                        </div>
                    </div>
                </Section>

                <Section title="Recent Transactions">
                    <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900 text-xs text-gray-400 uppercase">
                                <tr>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Amount (Pi)</th>
                                    <th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_TRANSACTIONS.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
                            </tbody>
                        </table>
                    </div>
                </Section>
            </div>
            <SendModal 
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onSend={handleSendPi}
                balance={user.piBalance}
            />
            <ReceiveModal
                isOpen={isReceiveModalOpen}
                onClose={() => setIsReceiveModalOpen(false)}
                walletAddress={user.walletAddress}
            />
            <AddFundModal
                isOpen={isAddFundModalOpen}
                onClose={() => setIsAddFundModalOpen(false)}
            />
            <BuySellModal
                isOpen={isBuySellModalOpen}
                onClose={() => setIsBuySellModalOpen(false)}
                balance={user.piBalance}
            />
            <SwapModal
                isOpen={isSwapModalOpen}
                onClose={() => setIsSwapModalOpen(false)}
                balance={user.piBalance}
            />
            <BridgeModal
                isOpen={isBridgeModalOpen}
                onClose={() => setIsBridgeModalOpen(false)}
                balance={user.piBalance}
            />
        </>
    );
};

export default WalletPage;