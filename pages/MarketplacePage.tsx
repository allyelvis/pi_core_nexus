
import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Section } from '../components/Section';
import { MOCK_PRODUCTS } from '../constants';

const MarketplacePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section title="Marketplace">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search for products or sellers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-lg px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                 {filteredProducts.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl">No products found for "{searchTerm}"</p>
                        <p>Try searching for something else.</p>
                    </div>
                )}
            </Section>
        </div>
    );
};

export default MarketplacePage;
