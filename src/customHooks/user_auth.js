
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    
    const login = (response) => {
        const { accessToken, data } = response; // Extract accessToken and user data from response
        setUser(data); // Set user data from the response
        setAccessToken(accessToken); // Set the access token from the response
        localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
        localStorage.setItem('accessToken', accessToken); // Store access token in local storage
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

