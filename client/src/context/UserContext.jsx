import React, { createContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const UserContext = createContext({});

// 2. Crear el Proveedor (Provider)
export const UserProvider = ({ children }) => {
    // Inicializar el estado del usuario leyendo de localStorage
    const [userInfo, setUserInfo] = useState(() => {
        try {
            const storedInfo = localStorage.getItem('userInfo');
            return storedInfo ? JSON.parse(storedInfo) : null;
        } catch (error) {
            console.error("Error al parsear userInfo de localStorage:", error);
            return null;
        }
    });

    // Guardar en localStorage cada vez que userInfo cambie
    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [userInfo]);

    // Función de Login (recibe datos del API)
    const loginUser = (data) => {
        setUserInfo(data);
    };

    // Función de Logout
    const logoutUser = () => {
        setUserInfo(null);
    };
    
    // El valor que se comparte en el contexto
    const contextValue = {
        userInfo,
        loginUser,
        logoutUser,
        isAuthenticated: !!userInfo,
        isAdmin: userInfo ? userInfo.isAdmin : false,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext }
