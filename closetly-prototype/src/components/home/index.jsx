import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const Home = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <div className="text-2xl font-bold pt-14">Loading...</div>; // Show a loading state or fallback UI
    }

    return (
        
        <div className="text-2xl font-bold pt-14">
            Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
        </div>
    );
};

export default Home;
