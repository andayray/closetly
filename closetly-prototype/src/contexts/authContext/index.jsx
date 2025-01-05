import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  async function initializeUser(user) {
    setLoading(true); // Start loading when user state changes
    setTimeout(() => {
      if (user) {
        setCurrentUser({ ...user });

        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail);

        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false); // End loading once updates are applied
    }, 0); // Debounce to avoid React's concurrent rendering conflicts
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
        {!loading && children} {/* Prevent rendering until loading is false */}
    </AuthContext.Provider>
);

}
