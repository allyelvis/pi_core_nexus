import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Button } from '../components/Button';

const PiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h2a1 1 0 110 2H11v8h1a1 1 0 110 2h-2a1 1 0 110-2h1V6H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = MOCK_PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
                <h1 className="text-4xl font-bold text-white">Product Not Found</h1>
                <p className="text-gray-400 mt-4">We couldn't find the product you're looking for.</p>
                <Link to="/marketplace" className="mt-8 inline-block">
                    <Button variant="primary">Back to Marketplace</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link to="/marketplace" className="text-purple-400 hover:text-purple-300 transition-colors">
                    &larr; Back to Marketplace
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Image Column */}
                <div>
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-auto object-cover rounded-lg shadow-2xl shadow-purple-900/20"
                    />
                </div>

                {/* Details Column */}
                <div className="flex flex-col h-full">
                    <h1 className="text-4xl font-extrabold text-white mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-400 mb-6">
                        Sold by <span className="font-semibold text-purple-300">{product.seller}</span>
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="mt-auto pt-8">
                         <div className="bg-gray-800 rounded-lg p-6 mb-8">
                            <p className="text-sm text-gray-400 mb-2">Price</p>
                            <div className="flex items-center text-3xl font-bold text-purple-400">
                                <PiIcon /> {product.pricePi}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">${product.priceUsd.toFixed(2)}</p>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="primary" className="flex-1 py-3 text-lg" onClick={() => alert(`Proceeding to buy ${product.name}!`)}>Buy Now</Button>
                            <Button variant="secondary" className="flex-1 py-3 text-lg" onClick={() => alert(`${product.name} added to cart!`)}>Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
