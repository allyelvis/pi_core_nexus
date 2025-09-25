
import React from 'react';
import { Section } from '../components/Section';
import { MOCK_GAMES } from '../constants';
import { Game } from '../types';
import { Button } from '../components/Button';

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
    <div className="rounded-lg overflow-hidden shadow-lg group relative aspect-[3/4]">
        <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold">{game.title}</h3>
            <p className="text-purple-300 mb-4">{game.genre}</p>
            <Button className="w-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Play Now</Button>
        </div>
    </div>
);


const GamesPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section title="Play-to-Earn Games">
                <p className="text-gray-400 mb-8 max-w-3xl">
                    Dive into our collection of games integrated with the Pi ecosystem. Earn tokens, mint in-game items, and compete with other Pioneers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {MOCK_GAMES.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default GamesPage;
