
import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, MOCK_VIDEOS, MOCK_GAMES } from '../constants';
import { Button } from '../components/Button';

const VideoCard: React.FC<{ video: typeof MOCK_VIDEOS[0] }> = ({ video }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg group">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {video.isLive && <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">LIVE</div>}
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white font-semibold">{video.title}</h3>
            <p className="text-gray-300 text-sm">{video.streamer}</p>
        </div>
    </div>
);

const GameCard: React.FC<{ game: typeof MOCK_GAMES[0] }> = ({ game }) => (
    <div className="rounded-lg overflow-hidden shadow-lg group relative">
        <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <div>
                 <h3 className="text-white font-bold text-lg">{game.title}</h3>
                 <p className="text-purple-300 text-sm">{game.genre}</p>
            </div>
        </div>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Welcome to <span className="text-purple-400">Pi Core Nexus</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          The all-in-one platform for commerce, entertainment, and gaming, powered by the Pi Network.
        </p>
        <div className="mt-8 flex justify-center gap-4">
            <Link to="/marketplace"><Button variant="primary" className="text-lg px-8 py-3">Explore Marketplace</Button></Link>
            <Link to="/streaming"><Button variant="outline" className="text-lg px-8 py-3">Watch Streams</Button></Link>
        </div>
      </div>

      {/* Featured Products */}
      <Section title="Featured Products">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* Live Streams */}
       <Section title="Live Now">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_VIDEOS.filter(v => v.isLive).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </Section>

      {/* Top Games */}
      <Section title="Top Games">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {MOCK_GAMES.slice(0, 4).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
