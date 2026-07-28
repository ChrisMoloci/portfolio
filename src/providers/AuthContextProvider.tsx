import AuthContext from "../context/AuthContext.ts";
import {useEffect, useState} from "react";
import {api} from "../api/client.ts"
import type {Credentials} from "../types/Credentials.ts";

type Props = {
    children: React.ReactNode;
}

function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState(() => undefined);
    const [isLoading, setIsLoading] = useState(() => true);

    const fetchUser = async () => {
        try {
            const response = await api.get('users/me');
            console.log("User already authenticated")
            setUser(response.data);
        } catch (error) {
            console.error(error);
            setUser(undefined);
        } finally {
            setIsLoading(false);
        }
    };

    // Check if user is authenticated on initial load
    useEffect(() => {
        fetchUser();
        console.log("Use Effect for fetching user")
    }, []);

    const login = async (credentials: Credentials) => {
        // Backend sets the HttpOnly cookies on success

        try {
            // This sets http only cookies
            await api.post('/auth/login', credentials);

            // Once cookies are acquired, setIsLoading to true to get user again
            await fetchUser();
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        // Backend clears the HttpOnly cookies
        await api.post('/auth/logout');
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;