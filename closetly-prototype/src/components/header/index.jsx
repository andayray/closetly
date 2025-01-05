import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
            {userLoggedIn && (
                <button
                    onClick={async () => {
                        try {
                            await doSignOut();
                            setTimeout(() => navigate('/login'), 0); // Delay navigation
                        } catch (error) {
                            console.error('Failed to log out:', error);
                        }
                    }}
                    className="text-sm text-blue-600 underline"
                >
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Header;
