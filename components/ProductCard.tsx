import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

const PiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h2a1 1 0 110 2H11v8h1a1 1 0 110 2h-2a1 1 0 110-2h1V6H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the parent Link from navigating
    console.log(`Added ${product.name} to cart.`);
    alert(`Added ${product.name} to cart!`);
  };
  
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="text-sm text-gray-400 mt-1">by {product.seller}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
              <div className="flex flex-col">
                  <span className="flex items-center text-xl font-bold text-purple-400">
                      <PiIcon /> {product.pricePi}
                  </span>
                  <span className="text-xs text-gray-500">${product.priceUsd.toFixed(2)}</span>
              </div>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
