import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './index.css';

const Register = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handles form submission for registration
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                if (password !== confirmPassword) {
                    setErrorMessage('Passwords do not match.');
                    setIsRegistering(false);
                    return;
                }
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home');
            } catch (error) {
                setErrorMessage('Registration failed. Please try again.');
                setIsRegistering(false);
            }
        }
    };

    return (
        <div>
            {/* Redirect to home if the user is logged in */}
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">

                    {/* Header Section */}
                    <div className="text-center mb-6">
                        <h3 className="create-text">Create a New Account</h3>
                    </div>


                    {/* Form Section */}
                    <form onSubmit={onSubmit} className="space-y-4">
                        
                    {/* Email Input */}
                    <div className="inputGroup">
                        <input
                            type="email"
                            id="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    {/* Password Input */}
                    <div className="inputGroup">
                        <input
                            type="password"
                            id="password"
                            required
                            autoComplete="new-password"
                            disabled={isRegistering}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="inputGroup">
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            autoComplete="off"
                            disabled={isRegistering}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <span className="text-red-600 font-bold">{errorMessage}</span>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`custom-button ${isRegistering ? 'cursor-not-allowed' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>


                        {/* Login Link */}
                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link to={'/login'} className="hover:underline font-bold">
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;
