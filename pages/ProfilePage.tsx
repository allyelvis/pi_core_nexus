import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { EditProfileModal } from '../components/EditProfileModal';
import { User } from '../types';

const PiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 011-1h2a1 1 0 110 2H11v8h1a1 1 0 110 2h-2a1 1 0 110-2h1V6H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // This is a protected route. Redirect to login if not authenticated.
    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Render nothing while redirecting
    }
    
    // This is a mock function as we don't have a backend
    const handleProfileUpdate = (updatedUser: Partial<User>) => {
        console.log('Updating profile with:', updatedUser);
        alert('Profile updated! (This is a demo)');
        // In a real app, you'd also update the user state in the AuthContext
        setIsEditModalOpen(false);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Section title="My Profile">
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                            <img src={user.avatarUrl} alt={user.username} className="w-32 h-32 rounded-full ring-4 ring-purple-500" />
                            <div className="flex-grow text-center md:text-left">
                                <h2 className="text-3xl font-bold text-white">@{user.username}</h2>
                                <p className="text-gray-400 mt-2">Pioneer since 2024</p>
                                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                                    <Button variant="primary" onClick={() => setIsEditModalOpen(true)}>Edit Profile</Button>
                                    <Button variant="secondary" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
                                </div>
                            </div>
                            <div className="bg-gray-900/50 p-6 rounded-lg text-center">
                                 <p className="text-gray-400 text-sm">Current Balance</p>
                                <p className="text-3xl font-bold text-white flex items-center justify-center mt-2">
                                    <PiIcon /> {user.piBalance.toFixed(4)}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-800/50 px-8 py-6 border-t border-gray-700">
                           <h3 className="text-lg font-semibold text-white mb-4">Wallet Information</h3>
                           <dl>
                               <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                   <dt className="text-sm font-medium text-gray-400">Wallet Address</dt>
                                   <dd className="mt-1 text-sm text-purple-300 sm:mt-0 sm:col-span-2 font-mono break-all">{user.walletAddress}</dd>
                               </div>
                           </dl>
                        </div>
                    </div>
                </Section>
            </div>
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
                onSave={handleProfileUpdate}
            />
        </>
    );
};

export default ProfilePage;
