import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

const LoginPage: React.FC = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to home if already logged in
        }
    }, [user, navigate]);

    const handleLogin = () => {
        login();
        navigate('/'); // Redirect to home after login, or to a previous page if you store it
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center" style={{minHeight: 'calc(100vh - 12rem)'}}>
            <div className="max-w-md w-full text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome to Pi Core Nexus</h1>
                <p className="text-gray-400 mb-8">Please log in with your Pi account to continue.</p>
                <Button variant="primary" className="w-full text-lg py-3" onClick={handleLogin}>
                    Login with Pi
                </Button>
                <p className="text-xs text-gray-500 mt-6">
                    This is a simulated login. Clicking the button will grant you access to a demo account.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
