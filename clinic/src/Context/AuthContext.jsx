import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // You might want to perform additional actions (e.g., storing data in localStorage) before setting the user
        setUser(userData);
    };

    const logout = () => {
        // You might want to perform additional actions (e.g., clearing localStorage) before clearing the user
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
