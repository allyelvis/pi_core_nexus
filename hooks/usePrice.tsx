import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PriceContextType {
  prices: {
    pi: number;
    eth: number;
    btc: number;
    [key: string]: number;
  };
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

const INITIAL_PRICES = {
  pi: 30.00,
  eth: 3000.00,
  btc: 60000.00,
};

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState(INITIAL_PRICES);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => {
        // Simulate a small fluctuation, e.g., +/- 1.5%
        const fluctuate = (price: number) => {
          const changePercent = (Math.random() - 0.5) * 0.03; // Fluctuate between -1.5% and +1.5%
          const newPrice = price * (1 + changePercent);
          return Math.max(0, newPrice); // Ensure price doesn't go negative
        };
        
        return {
          pi: fluctuate(prevPrices.pi),
          eth: fluctuate(prevPrices.eth),
          btc: fluctuate(prevPrices.btc),
        };
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const value = { prices };

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
};

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
};
