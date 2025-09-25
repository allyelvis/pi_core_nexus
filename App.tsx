import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import StreamingPage from './pages/StreamingPage';
import GamesPage from './pages/GamesPage';
import WalletPage from './pages/WalletPage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './hooks/useAuth';
import { PriceProvider } from './hooks/usePrice';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PriceProvider>
        <HashRouter>
          <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/streaming" element={<StreamingPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </PriceProvider>
    </AuthProvider>
  );
};

export default App;