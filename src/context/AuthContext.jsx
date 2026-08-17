import React, { createContext, useState, useEffect } from 'react';
import API from '../utils/api';

//a context object where AuthContext is a global state that any component of the app can ask whether someone is logged in or not (user or admin)
export const AuthContext = createContext();

//children is a special reserved prop where the entire <App/> tag may be passed under the AuthProvider tags in index.js to check all components within the app
export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('userInfo');
        if (savedUser){
            setUser(JSON.parse(savedUser));//Restore state from browser storage
        }
        setLoading(false);//Done checking
    }, []);

    //Login function: calls backend POST /api/auth/login
    const login = async(email, password) =>{
        const {data} = await API.post('/auth/login', {email, password});
        setUser(data);//Saves user to React state

        localStorage.setItem('userInfo', JSON.stringify(data)); //Save to browser memory
        return data;
    };

    //Register function: calls backend POST /api/auth/register
    const register = async(name, email,password) =>{
        const {data} = await API.post('/auth/register', {name,email,password});
        setUser(data);

        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    };

    //Logout function
    const logout = () =>{
        setUser(null);//Reset react state
        localStorage.removeItem('userInfo');//clears browser storage
    };

    return(
        // Provide these variables and functions to any component inside 'children'
        <AuthContext.Provider value = {{user, loading, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
    
};