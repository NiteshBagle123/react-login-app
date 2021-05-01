import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if(storedUserLoggedInInformation === '1'){
          setIsLoggedIn(true);
        }
    }, []);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(true);
    };

    return (
        <AuthContextProvider
            value = {{ isLoggedIn, onLogOut: logoutHandler, onLogIn: loginHandler }}>
                {props.children}
        </AuthContextProvider>
    );
}

export default AuthContext;