import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home' },
    { name: 'Marketplace', path: '/marketplace', icon: 'store' },
    { name: 'Streaming', path: '/streaming', icon: 'play' },
    { name: 'Games', path: '/games', icon: 'gamepad' },
    { name: 'Wallet', path: '/wallet', icon: 'wallet' },
    { name: 'Profile', path: '/profile', icon: 'user' },
];

export const Sidebar: React.FC = () => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

    return (
        <aside className="w-64 bg-gray-800 p-4 flex flex-col">
            <div className="text-white font-bold text-2xl mb-8 text-center">
                Pi Core Nexus
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={navLinkClass}
                    >
                        {/* Icons would go here */}
                        <span className="ml-3">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="mt-auto text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Pi Core Nexus
            </div>
        </aside>
    );
};
