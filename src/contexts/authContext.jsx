/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { account, database } from "../configs/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { message } from 'antd';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    let error="";
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        //setLoading(false)
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.createEmailSession(userInfo.email, userInfo.password);
            let accountDetails = await account.get();
            setUser(accountDetails);
            error="yes";
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        return error;
    };

    const logoutUser = async () => {
        await account.deleteSession("current");
        setUser(null);
        error="";
        navigate("Login");
    };

    const registerUser = async (userInfo) => {
        setLoading(true);
    
        try {
            // Create a new user in Appwrite authentication
            let response = await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password,
                userInfo.name
            );
            await account.createEmailSession(userInfo.email, userInfo.password);
            const user = response.$id;
            const currentDate = new Date();
            await database.createDocument(
                "65d59de3458b98878f9c",
                "65d59df089a1a97810a0",
                user,
                {
                    userId: response.$id,
                    email: userInfo.email,
                    password: userInfo.password,
                    name: userInfo.name,
                    phone: userInfo.phone,
                    registrationDate: currentDate.toISOString(),
                }
            );
    
            // Fetch user details after registration
            let accountDetails = await account.get();
            setUser(accountDetails);
    
            // Display success message
            message.success('Registration successful. You can now log in.');
            navigate("/");
        } catch (error) {
            // Handle specific error cases
            if (error.code === 409) {
                // Code 1102 corresponds to duplicate email
                message.error('Email is already in use. Please use a different email.');
            } else {
                // Handle other error cases
                message.error('Registration failed. Please try again.');
            }
    
            console.error(error);
        }
    
        setLoading(false);
    };
    

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };


    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <span className="loading loading-bars loading-xs"></span>
                <span className="loading loading-bars loading-sm"></span>
                <span className="loading loading-bars loading-md"></span>
                <span className="loading loading-bars loading-lg"></span>                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
//Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
