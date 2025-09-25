import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h2a1 1 0 110 2H11v8h1a1 1 0 110 2h-2a1 1 0 110-2h1V6H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);


export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <PiIcon />
              <span className="text-white font-bold text-xl">Pi Core Nexus</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/marketplace" className={navLinkClass}>Marketplace</NavLink>
                <NavLink to="/streaming" className={navLinkClass}>Streaming</NavLink>
                <NavLink to="/games" className={navLinkClass}>Games</NavLink>
                <NavLink to="/wallet" className={navLinkClass}>Wallet</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className="ml-4 flex items-center md:ml-6 relative">
                 <div className="flex items-center bg-gray-900 px-3 py-1 rounded-full">
                    <PiIcon />
                    <span className="text-white font-semibold text-sm">{user.piBalance.toFixed(4)}</span>
                </div>
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="ml-3 max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1} onMouseLeave={() => setIsProfileMenuOpen(false)}>
                    <div className="px-4 py-2 text-sm text-gray-300">Signed in as <span className="font-bold text-white">{user.username}</span></div>
                    <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</Link>
                    <button onClick={() => { logout(); setIsProfileMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700">
                Login with Pi
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/marketplace" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Marketplace</NavLink>
            <NavLink to="/streaming" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Streaming</NavLink>
            <NavLink to="/games" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Games</NavLink>
            <NavLink to="/wallet" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>Wallet</NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user.username}</div>
                  <div className="flex items-center text-sm font-medium leading-none text-gray-400 mt-1"><PiIcon /> {user.piBalance.toFixed(4)}</div>
                </div>
              </div>
            ) : (
                <div className="px-2">
                     <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left bg-purple-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700">
                        Login with Pi
                     </Link>
                </div>
            )}
            <div className="mt-3 px-2 space-y-1">
                {user && (
                    <>
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</Link>
                        <button onClick={() => {logout(); setIsMenuOpen(false);}} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</button>
                    </>
                )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
