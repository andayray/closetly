import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import './index.css'; // Import the CSS file

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth();

    return (
        <nav className="header-nav">

            {/* Display user info on the left side */}
            <div className="user-info">
                Hello, {currentUser?.displayName ? currentUser.displayName : currentUser?.email}
            </div>

            {/* Logout button on the right side */}
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
                    className="logout-button"
                >
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Header;
